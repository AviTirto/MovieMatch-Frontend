export function addRoomHandlers(
    connection, 
    { 
        setRoomCode,
        setIsHost,
        setMembers, 
    },
    navigate
) {
    connection.on("RoomCreated", (roomCode) => {
        setRoomCode(roomCode)
        setIsHost(true)
        navigate("/lobby")
    })

    connection.on("RoomJoined", (roomCode) => {
        setRoomCode(roomCode)
        setIsHost(false)
        navigate("/lobby")
    })

    connection.on("RoomMemberUpdate", (members) => {
        setMembers(members)
    })

    connection.on("RoomNotFound", () => {
        setRoomCode(null)
        setIsHost(null)
        setMembers(null)
        navigate("/")
    })
}