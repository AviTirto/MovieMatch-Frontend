import React, { useState } from "react";
import { useRoom } from "../contexts/RoomContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../signalr/roomActions";

function CreatePage() {
  const { setRoomCode, setIsHost } = useRoom();
  const { setUsername } = useUser();

  const [hostName, setHostName] = useState("");
  const [services, setServices] = useState([]); // add UI as needed
  const [showType, setShowType] = useState("Movie");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { hostName, services, showType };

    try {
      const response = await fetch("http://localhost:5253/api/room/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();

      // Set context state first
      setRoomCode(data.code);
      setUsername(hostName);
      setIsHost(true);

      // Then join SignalR room and wait for confirmation
      await joinRoom(data.code, hostName);

      // Navigate to lobby only after successful join
      navigate("/lobby");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Host Name"
        value={hostName}
        onChange={(e) => setHostName(e.target.value)}
        required
      />
      {/* Add services and showType UI here */}
      <button type="submit">Create Room</button>
    </form>
  );
}

export default CreatePage;
