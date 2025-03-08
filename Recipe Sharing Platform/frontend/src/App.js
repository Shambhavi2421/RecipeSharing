import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from './components/Navbar'
import { Auth } from './pages/Auth';
// import Login from './pages/Login'
// import Register from './pages/Register'
import Home from './pages/Home'
import Create from './pages/Create'
import Saved from './pages/Saved'
import About from './pages/About'

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // Check if user is logged in
  //   const user = localStorage.getItem("username");
  //   setIsLoggedIn(!!user);
  // }, []);
  

  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route path="/" element={<Home /> } />
        {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route path="/home" element={<Home /> } />
        <Route path="/create" element={<Create /> } />
        <Route path="/saved" element={<Saved /> } />
        <Route path="/about" element={<About /> } />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App;

