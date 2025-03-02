import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function TeacherData() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await axios.get("https://backendfindonlinetutor-production.up.railway.app/register");
        const foundUser = result.data.find(i => i._id === id);
        if (foundUser) setUser(foundUser);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    
    loadUsers();
  }, [id]); // Depend only on 'id'

  const AddNotification = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backendfindonlinetutor-production.up.railway.app/profile", user);
      console.log("Notification added:", user);
      navigate(`/students`);
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  return (
    <div id="Teacher">
      <h1 style={{ textAlign: "center", textShadow: "3px 5px 5px darkgrey" }}>Teacher Details</h1>

      <div className="details">
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Teaching Mode:</td>
              <td>{user.mode}</td>
            </tr>
            <tr>
              <td>Fees Range:</td>
              <td>{user.min_fees} - {user.max_fees}</td>
            </tr>
            <tr>
              <td>Education Details:</td>
              <td>{user.edu}</td>
            </tr>
            <tr>
              <td>Experience:</td>
              <td>{user.exp}</td>
            </tr>
            <tr>
              <td>Teaching Field:</td>
              <td>{user.field}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={AddNotification} className="btn btn-success">
                  Add Notification
                </button>
                <Link to="/students" className="btn btn-secondary" style={{ marginLeft: "10px" }}>Back</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
