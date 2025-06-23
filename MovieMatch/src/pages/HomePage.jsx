import RoomCard from "../components/RoomCard"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Movie Match</h1>
            <h2>Tired of scrolling through Netflix, Amazon, Hulu, etc?</h2>
            <p>Welcome to Movie Match! A fun way to quickly find what to watch with your friends.</p>

            <div className="d-flex flex-row gap-3 justify-content-center">
                <RoomCard
                    title="Create Room"
                    onClick = {() => navigate('/create-room')}
                />
                <RoomCard
                    title="Join Room"
                    onClick = {() => navigate('/join-room')}
                />
            </div>
        </div>
    )
}