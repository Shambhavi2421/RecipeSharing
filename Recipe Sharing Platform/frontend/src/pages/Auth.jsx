import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state for Login/Register
  return (
    <div className="auth">
    {isLogin ? <Login /> : <Register />}
    <p>
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Register" : "Login"}
      </button>
    </p>
  </div>
   
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://backend-1pcr.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
          <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response= await axios.post("https://backend-1pcr.onrender.com/auth/register", {
        username, password
      });
      if (response.data.message === "User Registered Successfully") {
      alert("Registration Completed! Now login.");
    } else{
      alert("Error: " + response.data.message);
    }
  } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
