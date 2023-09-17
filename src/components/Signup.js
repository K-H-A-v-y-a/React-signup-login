import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    async function submit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/sign", {
                name, email, password, confirmPassword
            });

            if (response.data.status === "error") {
                alert(response.data.message);
            } else if (response.data.status === "success") {
                alert(response.data.message);
                history('/');
            }
        } catch (error) {
            alert("Server Error: " + error.message);
            console.error(error);
        }
    }

    return (
        <>
            <div className="navLink">
                <Link to="/"><p>Login</p></Link>
            </div>
            <div className="container">
                <div className="container-credentials">
                    <h2>SignUp</h2>
                    <form>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><br /><br />
                        
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br /><br />
                        
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><br /><br />
                        
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required /><br /><br />
                        <button onClick={submit}>SignUp</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
