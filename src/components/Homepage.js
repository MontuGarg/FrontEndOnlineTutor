import React, { useState, useEffect } from 'react';
import "./Homepage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Homepage() {
  const { id } = useParams();
  const [req, setReq] = useState([]);  // Requests array
  const [user, setUser] = useState(null); // Current user
  useEffect(() => {
    
    const loadUsers = async () => {
      try {
        const result = await axios.get("https://backendfindonlinetutor-production.up.railway.app/register");
        const foundUser = result.data.find((i) => i._id === id);
        if (foundUser) {
          setUser(foundUser);
          setReq(foundUser.note || []); // Ensure note is an array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadUsers();
  }, [id,user]); // Include 'id' in dependency array to prevent warnings

  return (
    <div id="Teacher">
      <h1 style={{ textAlign: "center", textShadow: "3px 5px 5px darkgrey" }}>Notifications</h1>
      <Link style={{ marginLeft: "90%" }} className="btn btn-primary" to="/addDetails">Update Profile</Link>

      {req.length > 0 ? (
        req.map((applicant, index) => (
          <div className="details" key={index}>
            <h1>{applicant.name} has applied.</h1>
            <table>
              <tbody>
                <tr>
                  <td><h3>Phone: {applicant.phone}</h3></td>
                </tr>
                <tr>
                  <td><h3>Email: {applicant.email}</h3></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <h3 style={{ textAlign: "center", color: "grey" }}>No applications yet.</h3>
      )}
    </div>
  );
}
