
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Login from "./Components/pages/Login";
import Footer from './Components/Footer/Footer'
import Register from "./Components/pages/Register";
import TestPage from "./Components/pages/TestPage";
import Challenges from "./Components/pages/Challenges";
import CheckStats from "./Components/pages/CheckStats";
import AboutUS from "./Components/pages/AboutUS";
import ContactUs from "./Components/pages/ContactUs";
import { ToastContainer } from 'react-toastify';
function App() {


  return (
    <>
    <ToastContainer/>
    <Router>
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/challenges" element={<Challenges/>}/>
    <Route path="/typing/:id" element={<TestPage/>}/>
    <Route path="/aboutus" element={<AboutUS/>}/>
    <Route path="/contactus" element={<ContactUs/>}/>
    <Route path="/stats" element={<CheckStats/>}/>
    </Routes>
    <Footer/>
    </Router>
        
    </>
  )
}

export default App
