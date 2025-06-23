import React, { useState } from "react";
import { useRoom } from "../contexts/RoomContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../signalr/roomActions";

function JoinPage() {
  const { setRoomCode, setIsHost } = useRoom();
  const { setUsername } = useUser();

  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5253/api/room/${roomCodeInput}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userNameInput }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to join room");
      }

      // Set context state first
      setRoomCode(roomCodeInput);
      setUsername(userNameInput);
      setIsHost(false);

      // Then join SignalR room and wait for confirmation
      await joinRoom(roomCodeInput, userNameInput);

      // Navigate to lobby only after successful join
      navigate("/lobby");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Room Code"
        value={roomCodeInput}
        onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
        required
      />
      <input
        placeholder="User Name"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
        required
      />
      <button type="submit">Join Room</button>
    </form>
  );
}

export default JoinPage;
