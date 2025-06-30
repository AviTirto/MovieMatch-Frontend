import { useRef, useEffect } from "react"
import getInstance from "../hub/connector";
import MovieCard from "../components/MovieCard"
import { useMovies } from "../contexts/MoviesContext"
import { useRoom } from "../contexts/RoomContext"
import { Like, RequestMovies } from "../hub/gameActions"
import UseTransform from "../components/UseTransform";

export default function GamePage() {
    const { movies, setMovies, match } = useMovies()
    const { roomCode } = useRoom()
    const connectorRef = useRef(null)

    console.log(movies)

    useEffect(() => {
        const setupConnection = async () => {
            const connector = getInstance();
            await connector.start();
            connectorRef.current = connector;
        }

        setupConnection();
    }, [])

    const handleDislike = async (e) => {
        const remainingMovies = movies.slice(1)
        setMovies(remainingMovies)

        if (remainingMovies.length == 1) {
            await RequestMovies(connectorRef.current.connection, roomCode)
        }
    }

    const handleLike = async (e) => {
        e.preventDefault()

        const movieToSend = movies[0]
        const remainingMovies = movies.slice(1)
        setMovies(remainingMovies)

        if (!connectorRef.current) {
            console.log("Connector is not ready yet!")
            return;
        }

        try {
            await Like(connectorRef.current.connection, roomCode, movieToSend)
        } catch (err) {
            console.log("Failed to like:", err)
        }

        if (remainingMovies.length == 1) {
            await RequestMovies(connectorRef.current.connection, roomCode)
        }

    }

    return (
        <div>
            
            <MovieCard movie={movies[0]} />
            <button onClick={ handleDislike }>❌</button>
            <button onClick={ handleLike }>✅</button>
            {
                match && <p>Match Found! {match.title}</p>
            }
            {/* <UseTransform /> */}
        </div>
    )
}