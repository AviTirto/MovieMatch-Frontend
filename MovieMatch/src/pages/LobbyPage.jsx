import { useRef, useEffect } from "react"
import { useRoom } from "../contexts/RoomContext"
import getInstance from "../hub/connector"
import { LeaveRoom, ToggleReady } from "../hub/roomActions"
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

    if(!connectorRef.current) {
      console.log("Connector is not ready yet!")
      return;
    }

    try {
      await ToggleReady(connectorRef.current.connection, roomCode)
    } catch(err){
      console.log("Failed to toggle ready:", err)
    }
  }

  return (
    <div className="bg-dark text-white container-fluid px-5 py-3 rounded">
      <h1>Lobby</h1>
      <h2>Room Code: {roomCode}</h2>
      <h5>Members</h5>
      <div className="row row-cols-2 g-2">
        {
          members.length > 0 && members.map((member, i) => {
            return (
              <MemberCard key={i} member={member} isMe={member.name === username} onToggleReady={ onToggleReady }/>
            )
          })
        }
      </div>
      { isHost && members.every(m => m.isReady) && <button>Start</button> }
      <button onClick={onLeave}>Leave</button>
    </div>
  )
}

export default LobbyPage