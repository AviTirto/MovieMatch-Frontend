import React, { useEffect, useState } from "react";
import { useRoom } from "../contexts/RoomContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Connector from "../signalr/connector";
import { leaveRoom, joinRoom } from "../signalr/roomActions";

function LobbyPage() {
  const { roomCode, setRoomCode, setIsHost } = useRoom();
  const { username, setUsername } = useUser();

  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const connection = Connector.connection;

    if (!roomCode || !username) {
      // If missing room or username, redirect to home
      navigate("/");
      return;
    }

    // Ensure SignalR connection is started
    if (connection.state !== "Connected") {
      connection
        .start()
        .then(() => joinRoom(roomCode, username)) // join the room once connected
        .catch((err) => {
          console.error("SignalR connection failed:", err);
          alert("Failed to connect to server.");
          navigate("/");
        });
    } else {
      // If already connected, join the room (for page refresh etc)
      joinRoom(roomCode, username);
    }

    // Handler for user list updates from server
    const handleUserUpdate = (usernames) => {
      setUserList(usernames);
    };

    // Subscribe to SignalR events
    connection.on("UserJoined", handleUserUpdate);
    connection.on("UserLeft", handleUserUpdate);

    // Cleanup on unmount: unregister events
    return () => {
      connection.off("UserJoined", handleUserUpdate);
      connection.off("UserLeft", handleUserUpdate);
    };
  }, [roomCode, username, navigate]);

  const handleLeave = async () => {
    try {
      await leaveRoom(roomCode);
    } catch (error) {
      console.error("Failed to leave room:", error);
    } finally {
      // Clear context and go home
      setRoomCode(null);
      setUsername(null);
      setIsHost(false);
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Lobby — Room: {roomCode}</h2>
      <h3>Users:</h3>
      <ul>
        {userList.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
      <button onClick={handleLeave}>Leave Room</button>
    </div>
  );
}

export default LobbyPage;
