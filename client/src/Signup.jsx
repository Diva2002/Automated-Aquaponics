import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Signup.css'
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Signup(){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    const handleSubmit =  (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }
        const errors = [];
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long");
        }
        if (password.length > 15) {
            errors.push("Password must be at most 15 characters long");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!/\d/.test(password)) {
            errors.push("Password must contain at least one number");
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            errors.push("Password must contain at least one special character");
        }
        if (/\s/.test(password)) {
            errors.push("Password cannot contain blank spaces");
        }
        if (errors.length > 0) {
            const errorContainer = document.getElementById("password-errors");
            errorContainer.innerHTML = "";
            const errorElement = document.createElement("div");
            errorElement.textContent = errors[0];
            errorContainer.appendChild(errorElement);
            return;
        }

        axios.post('http://localhost:3001/register',{name, email, password})
        .then(result => {
            console.log(result)
            navigate('/login')
        })
        .catch(err => {
            if (err.response.data.message === "Email already exists") {
                alert("Email already exists");
            } else {
                console.log(err);
            }
        });
    }

    return(
        
        <div className="d-flex bg justify-content-center align-items-center vh-100" >
            <div className="p-3 container1 rounded w-25">
                <h2>REGISTER</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input 
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="off"
                        name="username"
                        className="form-control rounded-0"
                        id="username"
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        id="email"
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
                            id="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div id="password-errors" className="text-danger"></div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" id="regbut">
                        Register
                    </button>
                </form>
                <p><br/>Already have an Account?</p>
                <Link to="/login" id="log" className="btn btn-default border w-100  bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );

}
export default Signup;