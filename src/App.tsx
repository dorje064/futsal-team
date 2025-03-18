import { useState } from 'react'

import './App.css'
import { PlayerList } from './features/Player'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PlayerList />
    </>
  )
}

export default App
