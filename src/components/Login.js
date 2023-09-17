import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles.css';

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send a POST request to your server for login
      const response = await fetch("http://localhost:3000/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.status === "error") {
        alert(data.message);
      } else if (data.status === "success") {
        alert(data.message);
        history('/profile');
      }
    } catch (error) {
      console.error("Server Error", error);
    }
  };

  return (
    <>
      <div className="navLink">
        <Link to="/sign"><p>Signup</p></Link>
      </div>

      <div className="container">
        <div className="container-credentials">
          <h2>Login</h2>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br /><br />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br /><br />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;


