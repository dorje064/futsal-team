import { useState } from 'react'

import './App.css'
import { PlayerList } from './features/Player'
import { ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import { Teams } from './features/Team';


function App() {
  const [mode, setMode] = useState<'players' | 'teams'>('players')

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='d-flex justify-content-center mb-5'>
        {/* <PlayerList /> */}
        <Teams />
      </div>

      <Button variant="primary">Generate Teams</Button>
    </>
  )
}

export default App
