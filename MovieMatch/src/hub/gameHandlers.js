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
        setMovies(prevMovies => {
            console.log("Previous:", prevMovies?.length, "Incoming:", movies.length);
            return [...(prevMovies ?? []), ...movies]
        });
    })

    connection.on("MatchFound", (movie) => {
        setMatch(movie)
    })

}