import Connector from './connector.js';

export const joinRoom = async (roomCode, username) => {
  const connection = Connector.connection;

  try {
    // Start connection if not started
    if (connection.state !== "Connected") {
      await connection.start();
    }

    // Invoke join on server
    await connection.invoke("JoinRoomGroup", roomCode, username);
    console.log(`JoinRoomGroup invoked for room: ${roomCode}, user: ${username}`);

    // Wait for UserJoined event that confirms user is in the room
    await new Promise((resolve, reject) => {
      const handler = (usernames) => {
        if (usernames.includes(username)) {
          connection.off("UserJoined", handler);
          resolve();
        }
      };

      connection.on("UserJoined", handler);

      // Timeout after 5 seconds if no response
      setTimeout(() => {
        connection.off("UserJoined", handler);
        reject(new Error("Timed out waiting for join confirmation"));
      }, 5000);
    });

  } catch (error) {
    console.error("Error joining room:", error);
    throw error;  // re-throw so caller can handle alert/navigation
  }
}

export const leaveRoom = async (roomCode) => {
  try {
    await Connector.connection.invoke("LeaveRoomGroup", roomCode);
    console.log(`Successfully left room: ${roomCode}`);
  } catch (error) {
    console.error("Error leaving room:", error);
  }
}
