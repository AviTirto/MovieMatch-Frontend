import { createContext, useContext } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { useState } from 'react'
const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState("movies", [])
    const [match, setMatch] = useSessionStorage("match", null)

    return (
        <MoviesContext.Provider value={{ movies, setMovies, match, setMatch }}>
            {children}
        </MoviesContext.Provider>
    )
}

export const useMovies = () => useContext(MoviesContext);