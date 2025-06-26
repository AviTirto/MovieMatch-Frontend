import { useRef, useEffect } from "react"
import getInstance from "../hub/connector"
import { CreateRoom } from "../hub/roomActions"
import { useUser } from "../contexts/UserContext"

const CreatePageRoom = () => {
  const connectorRef = useRef(null)
  const usernameRef = useRef()
  const { setUsername } = useUser()

  useEffect(() => {
    const setupConnection = async () => {
      const connector = getInstance();
      await connector.start();
      connectorRef.current = connector;
    };

    setupConnection();
  }, []); 

  const onCreate = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;

    if (!connectorRef.current) {
      console.error("Connector is not ready yet.");
      return;
    }

    try {
      await CreateRoom(connectorRef.current.connection, username, 0, []);
      setUsername(username)
    } catch (err) {
      console.error("Failed to create room:", err);
    }
  };

  return (
    <div>
      <h1>Create Room</h1>
      <form>
        <input type="text" ref={usernameRef}/>
        <button onClick={onCreate}>Create</button>
      </form>
    </div>

  )
}

export default CreatePageRoom