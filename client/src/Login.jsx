import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Signup.css'
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Login(){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit =  (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login',{ email, password})
        .then(result => {
            console.log(result)

            const lerrors = [];

            if(result.data === "Success"){
                navigate('/home')
            }
            else if(result.data === "user not found"){
                alert("User not found")
            }
            else if(result.data === "password incorrect"){
                lerrors.push("Password incorrect")
            }

            if (lerrors.length > 0) {
                const errorContainer = document.getElementById("login-errors");
                errorContainer.innerHTML = "";
                const errorElement = document.createElement("div");
                errorElement.textContent = lerrors[0];
                errorContainer.appendChild(errorElement);
                return;
            }
        })
        .catch(err => console.log(err))
    }

    return(
        
        <div className="d-flex bg justify-content-center align-items-center vh-100" >
            <div className="p-3 container1 rounded w-25">
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        id="email_login"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            id="password_login"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div id="login-errors" className="text-danger"></div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" id="logbut">
                        Login
                    </button>
                </form>
                <p><br/>New User?</p>
                <Link to="/" id="Reg" className="btn btn-default border w-100  bg-light rounded-0 text-decoration-none">
                    Register
                </Link>
            </div>
        </div>
    );

}
export default Login;