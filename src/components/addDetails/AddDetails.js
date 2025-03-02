import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDetails({ id }) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        mode: "",
        field: "",
        min_fees: "",
        max_fees: "",
        edu: "",
        exp: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const result = await axios.get("https://backendfindonlinetutor-production.up.railway.app/register");
                const foundUser = result.data.find(i => i._id === id);
                if (foundUser) setUser(foundUser);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        loadUsers();
    }, [id]);

    const validate = () => {
        let newErrors = {};

        if (!user.name.trim() || user.name.length < 3 || !/^[a-zA-Z\s]+$/.test(user.name)) {
            newErrors.name = "Name must be at least 3 characters and contain only letters.";
        }

        if (!/^\d{10}$/.test(user.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!user.mode) {
            newErrors.mode = "Mode is required.";
        }

        if (!user.field) {
            newErrors.field = "Field is required.";
        }

        if (user.min_fees < 0) {
            newErrors.min_fees = "Min Fees cannot be negative.";
        }

        if (user.max_fees < user.min_fees) {
            newErrors.max_fees = "Max Fees cannot be less than Min Fees.";
        }

        if (!user.edu.trim()) {
            newErrors.edu = "Education details are required.";
        }

        if (!user.exp.trim()) {
            newErrors.exp = "Experience details are required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onValChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post("https://backendfindonlinetutor-production.up.railway.app/profile", user);
                navigate(`/Homepage/${id}`);
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
        else{
            alert("Please enter vaild details")
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('https://t3.ftcdn.net/jpg/02/96/69/22/360_F_296692203_k4lOpOt8mAcYpKzicNmJTpnsE9ZdwyHX.jpg')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                height: "92vh"
            }}
        >
            <div id="addCust" style={{ marginLeft: "33%", paddingTop: "10vh" }}>
                <h1 style={{ color: "white", marginLeft: "20px" }}>Update Profile</h1>
                <form onSubmit={onSubmit}>
                    <table style={{ color: "white" }}>
                        <tbody>
                            <tr>
                                <td>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        placeholder="Name"
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                                </td>
                                <td>
                                    Mobile:
                                    <input
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        placeholder="Mobile no."
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        placeholder="Email"
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Mode:
                                    <select onChange={onValChange} name="mode" className="form-control dropdown" required>
                                        <option value="">Select</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                    {errors.mode && <p style={{ color: "red" }}>{errors.mode}</p>}
                                </td>
                                <td>
                                    Field:
                                    <select onChange={onValChange} name="field" className="form-control dropdown" required>
                                        <option value="">Select</option>
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="Java">Java</option>
                                        <option value="CPP">CPP</option>
                                        <option value="Python">Python</option>
                                        <option value="C">C</option>
                                    </select>
                                    {errors.field && <p style={{ color: "red" }}>{errors.field}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Min Fees:
                                    <input
                                        type="number"
                                        name="min_fees"
                                        value={user.min_fees}
                                        placeholder="0"
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.min_fees && <p style={{ color: "red" }}>{errors.min_fees}</p>}
                                </td>
                                <td>
                                    Max Fees:
                                    <input
                                        type="number"
                                        name="max_fees"
                                        value={user.max_fees}
                                        placeholder="0"
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.max_fees && <p style={{ color: "red" }}>{errors.max_fees}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Education Details:
                                    <input
                                        type="text"
                                        name="edu"
                                        value={user.edu}
                                        placeholder="Enter Education details"
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.edu && <p style={{ color: "red" }}>{errors.edu}</p>}
                                </td>
                                <td>
                                    Experience:
                                    <input
                                        type="text"
                                        name="exp"
                                        value={user.exp}
                                        placeholder="Enter Experience"
                                        onChange={onValChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.exp && <p style={{ color: "red" }}>{errors.exp}</p>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button className="btn btn-success form-control" style={{ marginTop: "3%" }}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}
