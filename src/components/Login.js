import React, { useEffect, useState } from 'react';
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setLoginUser }) {
    const history = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('login-user'));
        if (data) {
            if (data.profession === "Student") {
                history("/students");
            } else if (data.profession === "Teacher") {
                history(`/Homepage/${data._id}`);
            }
        }
    }, [history]);  // Added 'history' to dependency array

    const [user, setUser] = useState({
        email: "",
        profession: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const login = async () => {
        const { email, password, profession } = user;
        if (email && password && profession) {
            axios.post("https://backendfindonlinetutor-production.up.railway.app/login", user).then(res => {
                if (res.data.user.profession === profession) {
                    if (res.data.user.profession === "Student") {
                        history("/students");
                    } else if (res.data.user.profession === "Teacher") {
                        history(`/Homepage/${res.data.user._id}`);
                    }
                    localStorage.setItem('login-user', JSON.stringify(res.data.user));
                    document.getElementById("namel").style.display = "inline-block";
                    document.getElementById("imal").style.display = "inline-block";

                    setLoginUser(res.data.user);
                } else {
                    alert(res.data.message);
                }
            });
        } else {
            alert("Please Fill all fields");
        }
    };

    return (
        <div id="logindiv">
            <div className='login'>
                <h1>
                    <img alt="logo" src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" style={{ width: "30%", borderRadius: "50%" }} />
                </h1>
                <input type="text" name="email" onChange={handleChange} value={user.email} className="form-control" placeholder="Enter the Email" />
                <input type="password" name="password" onChange={handleChange} value={user.password} className="form-control" placeholder="Enter the Password" />
                <select name="profession" onChange={handleChange} value={user.profession} className="form-control" required>
                    <option value="">Select</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
                <div className='button' onClick={login}>Login</div>
                <div>or</div>
                <div className='button'><Link id="link" to="/register">Register</Link></div>
            </div>
        </div>
    );
}
