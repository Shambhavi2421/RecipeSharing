import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/register");
  };
  return (
    <div class="navbar">
        <div class="logo"><i class="fa-solid fa-utensils"></i>RecipeHub</div>
        <input type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="menu-icon">&#9776;</label>
        <ul class="nav-links">
            <Link to="/" class= "nav">Home</Link>
            <Link to="/create" class= "nav">Add Recipe</Link>
            <Link to="/about" class= "nav">About</Link>
            <Link to="/saved" class= "nav">My Recipe</Link>
            {!cookies.access_token ? (
          <Link to="/auth" class="btn-group nav">Login/Register</Link>
            ) : (
            <button onClick={logout}> Logout </button>
            )}
          </ul>  

        
    </div>
  );
};

export default Navbar

