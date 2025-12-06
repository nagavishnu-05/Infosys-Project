import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CitizenPortal from './pages/Citizen/CitizenPortal.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/citizen" element={<CitizenPortal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
