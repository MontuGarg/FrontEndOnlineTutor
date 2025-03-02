import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDetails({id}) {
    
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
    }, [id]); // Depend only on 'id'

    const onValChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://backendfindonlinetutor-production.up.railway.app/profile", user);
            navigate(`/Homepage/${id}`);
        } catch (error) {
            console.error("Error updating profile:", error);
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
                                        required
                                        onChange={onValChange}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    Mobile:
                                    <input
                                        type="number"
                                        name="phone"
                                        value={user.phone}
                                        placeholder="Mobile no."
                                        required
                                        onChange={onValChange}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Mode:
                                    <select onChange={onValChange} name="mode" className="form-control dropdown">
                                        <option value="">Select</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </td>
                                <td>
                                    Field:
                                    <select onChange={onValChange} name="field" className="form-control dropdown">
                                        <option value="">Select</option>
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="Java">Java</option>
                                        <option value="CPP">CPP</option>
                                        <option value="Python">Python</option>
                                        <option value="C">C</option>
                                    </select>
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
                                        required
                                        onChange={onValChange}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    Max Fees:
                                    <input
                                        type="number"
                                        name="max_fees"
                                        value={user.max_fees}
                                        placeholder="0"
                                        required
                                        onChange={onValChange}
                                        className="form-control"
                                    />
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
                                        required
                                        onChange={onValChange}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    Experience:
                                    <input
                                        type="text"
                                        name="exp"
                                        value={user.exp}
                                        placeholder="Enter Experience"
                                        required
                                        onChange={onValChange}
                                        className="form-control"
                                    />
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
