import { useRef, useEffect } from "react"
import { useRoom } from "../contexts/RoomContext"
import getInstance from "../hub/connector"
import { LeaveRoom, ToggleReady } from "../hub/roomActions"
import { StartGame } from "../hub/gameActions"
import { useNavigate } from 'react-router-dom'
import MemberCard from "../components/MemberCard"
import { useUser } from "../contexts/UserContext"

const LobbyPage = () => {
  const connectorRef = useRef(null)
  const navigate = useNavigate()
  const { username } = useUser()
  const { roomCode, members, isHost } = useRoom()

  useEffect(() => {
    const setupConnection = async () => {
      const connector = getInstance()
      await connector.start()
      connectorRef.current = connector
    }

    setupConnection()
  }, [])

  const onLeave = async (e) => {
    e.preventDefault()

    if (!connectorRef.current) {
      console.log("Connector in not ready yet!");
      return;
    }

    try {
      await LeaveRoom(connectorRef.current.connection, roomCode)
    } catch (err) {
      console.log("Failed to leave room:", err);
    }
    navigate("/")
  }

  const onToggleReady = async (e) => {
    e.preventDefault()

    if (!connectorRef.current) {
      console.log("Connector is not ready yet!")
      return;
    }

    try {
      await ToggleReady(connectorRef.current.connection, roomCode)
    } catch (err) {
      console.log("Failed to toggle ready:", err)
    }
  }

  const onStart = async (e) => {
    e.preventDefault()

    if (!connectorRef.current) {
      console.log("Connector is not ready yet!")
      return;
    }

    try {
      await StartGame(connectorRef.current.connection, roomCode)
    } catch (err) {
      console.log("Failed to start game:", err)
    }
  }

  return (
    <div className="container-fluid px-5 py-3 rounded-lg shadow-lg">
      <h1>Lobby</h1>
      <h2>Room Code: {roomCode}</h2>
      <h5>Members</h5>
      <div className="space-y-2">
        {
          members.length > 0 && members.map((member, i) => {
            return (
              <MemberCard key={i} member={member} isMe={member.name === username} onToggleReady={onToggleReady} />
            )
          })
        }
      </div>
      {isHost && members.every(m => m.isReady) && <button onClick={ onStart }>Start</button>}
      <button className="bg-red-600 text-gray-200 rounded-lg" onClick={onLeave}>Leave</button>
    </div>
  )
}

export default LobbyPage