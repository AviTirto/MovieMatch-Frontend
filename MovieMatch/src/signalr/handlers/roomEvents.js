export const registerRoomEvents = (connection, handlers) => {
    connection.on("RoomNotFound", handlers.onRoomNotFound);
    connection.on("UserNotFound", handlers.onUserNotFound);
    connection.on("UserJoined", handlers.onUserJoined);
    connection.on("UserLeft", handlers.onUserLeft);
  };
  
  export const unregisterRoomEvents = (connection) => {
    connection.off("RoomNotFound");
    connection.off("UserNotFound");
    connection.off("UserJoined");
    connection.off("UserLeft");
  };
  