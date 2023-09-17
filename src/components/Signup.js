import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const history = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Check if the password meets your criteria (e.g., minimum length)
    return password.length >= 6;
  };

  const validateForm = () => {
    if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!isPasswordValid(password)) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Send a POST request to your server for signup
      const response = await fetch("http://localhost:3000/sign", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();
      
      if (data.status === "error") {
        alert(data.message);
      } else if (data.status === "success") {
        alert(data.message);
        history('/React-signup-login/');
      }
    } catch (error) {
      console.error("Server Error", error);
    }
  };

  return (
    <>
      <div className="navLink">
        <Link to="/React-signup-login/"><p>Login</p></Link>
      </div>
      <div className="container">
        <div className="container-credentials">
          <h2>SignUp</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><br /><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br /><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><br /><br />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required /><br /><br />
          <button onClick={handleSignup}>SignUp</button>
        </div>
      </div>
    </>
  );
}

export default Signup;







