import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import socket from "../socket/socket";

interface Message {
    msg: string;
    name: string;
    roomId: string
}

const Chat = () => {

    const [messages, setMessages] = useState<Message[]>([])

    const messageEndRef = useRef<HTMLDivElement | null >(null)

    const [message, setMessage] = useState("")

    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get("name")
    const roomId = searchParams.get("roomId")

    const sendMessage = (e: any) => {
      e.preventDefault()
      if (!message) {
        alert("Enter message first!")
        return;
      }

      const msgObject = {
        msg: message,
        name,
        roomId
      }
      socket.emit("send-message", msgObject)
      setMessage("")
    }

    useEffect(() => {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth"
      })
    }, [messages])

    useEffect(() => {
      socket.on("receive-message", (data) => {
        setMessages((prev) => [...prev, data])
      })
    }, [])
  

  return (
    <div
    className="flex p-6 flex-col bg-gray-800 text-white w-screen  h-screen text-2xl"
    >
      <div className="h-[90%] gap-8 flex flex-col overflow-scroll">
        {
          messages.map((msg, i) => (
            <div className="gap-1 flex flex-col">
              <p className="text-xs">{msg.name}</p>
            <div key={i} className="flex bg-gray-700 p-2 w-fit px-4 rounded-md text-left flex-col">
              <h1 className="font-bold text-lg">{msg.msg}</h1>
            </div>
            </div>
          ))
        }
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={(e) => sendMessage(e)} className="h-[10%] items-center justify-center gap-10  flex">
        <input 
        type="text"
        value={message}
        placeholder="Enter a message..."
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-gray-600 rounded-md outline-none py-3 text-xl px-6"
        />
        <button type="submit"
        className="bg-blue-500 px-6 py-3 rounded-md"
        >Send</button>
      </form>
    </div>
  )
}

export default Chat
