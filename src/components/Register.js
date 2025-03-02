import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    ids: "",
    profession: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (user.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!/^\d{10}$/.test(user.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!user.profession) {
      newErrors.profession = "Please select a profession.";
    }

    if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (user.password !== user.repassword) {
      newErrors.repassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const Register = async () => {
    if (validateForm()) {
      try {
        await axios.post("https://backendfindonlinetutor-production.up.railway.app/register", user);
        alert("Registration Successful!");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div id="logindiv">
      <div className="login">
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={user.name}
          placeholder="Full Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={user.email}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="number"
          name="phone"
          onChange={handleChange}
          value={user.phone}
          placeholder="Mobile Number"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <select name="profession" onChange={handleChange} value={user.profession} className="form-control">
          <option value="">Select Profession</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        {errors.profession && <p className="error">{errors.profession}</p>}

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
          placeholder="Enter the Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="repassword"
          onChange={handleChange}
          value={user.repassword}
          placeholder="Re-Enter the Password"
        />
        {errors.repassword && <p className="error">{errors.repassword}</p>}

        <div className="button" onClick={Register}>Register</div>
        <div>or</div>
        <div className="button"><Link id="link" to="/login">Login</Link></div>
      </div>
    </div>
  );
}
