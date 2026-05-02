import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Standard routes that include the Navigation */}
        <Route path="/popular" element={
          <>
            <Nav />
            <Dashboard />
          </>
        } />
        <Route path="*" element={
          <>
            <Nav />
            <Dashboard />
          </>
        } />
      </Routes>
    </>
  )
}

export default App
