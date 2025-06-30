export const StartGame = async (connection, roomCode) => {
    await connection.invoke("StartGame", roomCode)
}

export const RequestMovies = async (connection, roomCode) => {
    await connection.invoke("RequestMovies", roomCode)
}

export const Like = async (connection, roomCode, movie) => {
    await connection.invoke("Like", roomCode, movie)
}
