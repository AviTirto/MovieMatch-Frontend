export const StartGame = async (connection, roomCode) => {
    await connection.invoke("StartGame", roomCode)
}

export const RequestMovies = async (roomCode) => {
    await connection.invoke("JoinRoom", roomCode)
}

export const Like = async (connection, roomCode, movie) => {
    await connection.invoke("LeaveRoom", roomCode, movie)
}
