import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])

    const submitlogin = async () => {
        console.log(email, password)
        let result = await fetch('http://localhost:8081/login ', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/JSON"
            }
        })
        result = await result.json();
        console.log(result)

        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/")
        } else {
            alert("Please enter correct details!")
        }

    }
    return (

        <div className="loginform">
            <h1>LOGIN</h1>

            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"></input>
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"></input>
            <button onClick={submitlogin} className="btn btn-primary" type="submit">Login</button>
        </div>
    )
}
export default Login;
