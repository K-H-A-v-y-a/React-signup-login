import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

import './styles.css';

function Login(){
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/",{
                email,password
            })
            .then(res=>{
                if (res.data.status === "exist") {
                    alert(res.data.message);
                  } else if (res.data.status === "success") {
                    alert(res.data.message);
                    history('/profile');
                  }
                
            })
            .catch(e=>{
                alert("Server Error "+ e);
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    return(

        <>
            <div className="navLink">
                <Link to="/sign"><p>Signup</p></Link>
            </div> 

            <div className="container">
                <div className="container-credentials">
                    <h2>Login</h2>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" /><br></br><br></br>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="password" /><br></br><br></br>
                        <button onClick={submit}>Login</button>
                </div>
            </div>
        </>

    )
    
}

export default Login;