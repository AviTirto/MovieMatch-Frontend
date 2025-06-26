import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { RoomProvider } from './contexts/RoomContext'
import { UserProvider } from './contexts/UserContext.jsx'
import { MoviesProvider } from './contexts/MoviesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <UserProvider>
          <MoviesProvider>
            <App />
          </MoviesProvider>
        </UserProvider>
      </RoomProvider>
    </BrowserRouter>
  </StrictMode>,
)
