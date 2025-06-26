import './App.css'
import { useEffect } from 'react'
import AppRouter from './router/AppRouter'
import { useRoom } from './contexts/RoomContext'
import { useMovies } from './contexts/MoviesContext'
import getInstance from './hub/connector'
import { useNavigate } from 'react-router-dom'

function App() {
  const roomContext = useRoom()
  const moviesContext = useMovies()
  const navigate = useNavigate()
  useEffect(() => {
    const setupConnection = async () => {
      const connector = getInstance(roomContext, moviesContext, navigate);
      try {
        await connector.start();
        console.log("SignalR connection started.");
      } catch (err) {
        console.error("SignalR connection failed to start:", err);
      }
    };
  
    setupConnection();
  }, []);

  return (
    <AppRouter/>
  )
}

export default App
