import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css'
import { ToastContainer } from "react-toastify";

import { GlobalNavbar } from './components/navbar';
import { PlayerList } from './features/Player';
import { Teams } from './features/Team';
import { GeneratedTeams } from './features/Team/generatedTeams';

function App() {

  return (
    <Router>
      <div>
        <GlobalNavbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<PlayerList />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/generated-teams" element={<GeneratedTeams />} />
        </Routes>
      </div>
    </Router>
  )
  //     <GlobalNavbar setMode={setMode} />
  //     <ToastContainer position="top-right" autoClose={3000} />
  //     { mode === 'players' && <PlayerList /> }
  // { mode === 'teams' && <Teams /> }
  //   </>
  // )
}

export default App
