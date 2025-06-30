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
    <div className="shadow-lg rounded-lg p-10">
      <h1>Create New Room!</h1>
      <form className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <input className="bg-white border-b-2 border-black" id="username" type="text" ref={usernameRef}/>
        <button onClick={onCreate} className="rounded-lg bg-lime-500 shadow-lg">Create</button>
      </form>
    </div>

  )
}

export default CreatePageRoom