import { Routes, Route } from 'react-router-dom';
import CreateRoomPage from '../pages/CreateRoomPage';
import JoinRoomPage from '../pages/JoinRoomPage';
import HomePage from '../pages/HomePage';
import LobbyPage from '../pages/LobbyPage';
import GamePage from '../pages/GamePage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create-room' element={<CreateRoomPage />} />
            <Route path='/join-room' element={<JoinRoomPage />} />
            <Route path='/lobby' element={<LobbyPage />} />
            <Route path='/game' element={<GamePage />} />
            <Route path='*' element={<h1>Error 404 No Page Found</h1>} />
        </Routes>
    )
}