export const makeOnRoomNotFound = () => (roomCode) => {
    alert(`Room not found: ${roomCode}`);
  };
  
  export const makeOnUserNotFound = () => (connectionId) => {
    alert(`User not found: ${connectionId}`);
  };
  
  export const makeOnUserJoined = (setUsernames) => (usernames) => {
    setUsernames(usernames);
  };
  
  export const makeOnUserLeft = (setUsernames) => (usernames) => {
    setUsernames(usernames);
  };
  