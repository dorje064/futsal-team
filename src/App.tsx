import { useState } from 'react'

import './App.css'
import { PlayerList } from './features/Player'
import { ToastContainer } from "react-toastify";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <PlayerList />
    </>
  )
}

export default App
