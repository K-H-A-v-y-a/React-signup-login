import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
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
            alert("Server Error " + error.message);
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
                    Name : <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Name" /><br /><br />
                    Email : <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" /><br /><br />
                    Password : <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" /><br /><br />
                    Confirm Password : <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Password" /><br /><br />
                    <button onClick={submit}>SignUp</button>
                </div>
            </div>
        </>
    )
}

export default Signup;
