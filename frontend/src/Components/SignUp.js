import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }

    })

    const submitsignup = async () => {
        console.log(name, email, password)
        let result = await fetch('http://localhost:8081/register ', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': "application/JSON"
            }
        })
        result = await result.json();
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className="signupform">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"></input>
            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"></input>
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"></input>
            <button onClick={submitsignup} className="btn btn-primary" type="submit">Sign Up</button>
        </div>
    )
}

export default SignUp;
