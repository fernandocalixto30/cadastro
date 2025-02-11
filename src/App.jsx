import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cadastro from "./Pages/Cadastro"
import Login from "./Pages/Login"
import NoPage from "./Pages/NoPage"


function App() {


  return (
 
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<NoPage/>} />
   </Routes>
    </Router>
  )
}

export default App
