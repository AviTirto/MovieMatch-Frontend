export function addGameHandlers(
    connection, 
    { 
        setMovies,
        setMatch
    },
    navigate
) {
    connection.on("GameStarted", (movies) => {
        navigate("/game")
        setMovies(movies)
    })

    connection.on("RecieveMovies", (movies) => {
        setMovies(prevMovies => [...prevMovies, ...movies]);
    })

    connection.on("MatchFound", (movie) => {
        setMatch(movie)
    })

}