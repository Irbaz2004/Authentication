import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import './App.css'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      
    <Route exact path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/home" element={<Home />} /> 
    </Routes>
    </>
  )
}

export default App
