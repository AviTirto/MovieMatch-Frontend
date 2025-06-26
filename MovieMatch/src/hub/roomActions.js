export const CreateRoom = async (connection, username, showType, services) => {
    await connection.invoke("CreateRoom", username, showType, services)
}

export const JoinRoom = async (connection, roomCode, username) => {
    await connection.invoke("JoinRoom", roomCode, username)
}

export const LeaveRoom = async (connection, roomCode) => {
    await connection.invoke("LeaveRoom", roomCode)
}

export const ToggleReady = async (connection, roomCode) => {
    await connection.invoke("ToggleReady", roomCode)
}
