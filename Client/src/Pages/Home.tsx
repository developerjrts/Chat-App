import { useState } from "react"
import { useNavigate } from "react-router-dom"
import socket from "../socket/socket"

const Home = () => {

    const [name, setName] = useState("")
    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate()

    const joinRoom = () => {
        socket.emit("join-room", { name, roomId });
        socket.on("joined-room", (data) => {
            console.log(`Joined room: ${data.roomId}, ${data.name}`);
            navigate(`/chat?name=${name}&roomId=${roomId}`)
        });
    }


  return (
    <div
    className="flex bg-gray-800 text-white justify-center items-center h-screen text-2xl"
    >
        <div className="flex flex-col gap-10">
            <input type="text"
            className="bg-gray-700 p-2 rounded-md text-white outline-none"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)} />
            <input type="text"
            className="bg-gray-700 p-2 rounded-md text-white outline-none"
             placeholder="Enter your room id..."
             value={roomId}
             onChange={(e) => setRoomId(e.target.value)} />
             <button
              onClick={() => joinRoom()}
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                Join Room
             </button>
        </div>
    </div>
  )
}

export default Home