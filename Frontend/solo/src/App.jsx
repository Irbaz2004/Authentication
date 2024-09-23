import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import './App.css'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route exact path="/home" element={<Home />} /> 
      <Route exact path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App
