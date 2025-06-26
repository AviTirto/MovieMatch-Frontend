import { useRef, useEffect } from "react"
import getInstance from "../hub/connector";
import { JoinRoom } from "../hub/roomActions";
import { useUser } from "../contexts/UserContext";

const JoinRoomPage = () => {
    const connectorRef = useRef(null)
    const roomCodeRef = useRef()
    const usernameRef = useRef()
    const { setUsername } = useUser()

    useEffect(() => {
        const setupConnection = async () => {
            const connector = getInstance();
            await connector.start();
            connectorRef.current = connector;
        }

        setupConnection();
    }, [])

    const onJoin = async (e) => {
        e.preventDefault()

        if(!connectorRef.current) {
            console.log("Connector is not ready yet.")
            return;
        }

        try {
            await JoinRoom(connectorRef.current.connection, roomCodeRef.current.value, usernameRef.current.value)
            setUsername(usernameRef.current.value)
        } catch(err) {
            console.log("Failed to join room:", err)
        }
    }

    return (
        <div>
            <h1>Join Room</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" ref={usernameRef}/>
                <label htmlFor="roomcode">Room Code:</label>
                <input id="roomcode" type="text" ref={roomCodeRef}/>
                <button onClick={onJoin}>Join</button>
            </form>
        </div>
        
    )
}

export default JoinRoomPage;