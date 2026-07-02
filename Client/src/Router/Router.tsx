import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "../Pages/Chat"
import Home from "../Pages/Home"

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router