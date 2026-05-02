import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import Mangapage from './components/Mangapage'
import MangaRead from './components/MangaRead'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />


        <Route path="/popular" element={
          <>
            <Nav />
            <Dashboard />
          </>
        } />

        <Route path="/Mangapage/:id" element={
          <>
            <Nav />
            <Mangapage />
          </>
        } />

        <Route path="*" element={
          <>
            <Nav />
            <Dashboard />
          </>
        } />
        <Route path="/Home" element={
          <>
            <Nav />
            <Dashboard />
          </>
        } />
        <Route path="/MangaRead/:id" element={
          <>
            <Nav />
            <MangaRead />
          </>} />

      </Routes>

    </>
  )
}

export default App
