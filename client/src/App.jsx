import { Routes,Route,Navigate } from 'react-router-dom';
import './App.css'
import Login from "./components/login/Login.jsx"
import Home from "./components/home/Home.jsx"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
