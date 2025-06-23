import { createContext, useContext } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useSessionStorage('username', null);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);