import { createContext, useContext } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [roomCode, setRoomCode] = useSessionStorage('roomCode', null);
    const [isHost, setIsHost] = useSessionStorage('isHost', null);
    const [members, setMembers] = useSessionStorage('members', null);

    return (
        <RoomContext.Provider value={{ roomCode, setRoomCode, isHost, setIsHost, members, setMembers }}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoom = () => useContext(RoomContext);