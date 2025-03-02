import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Students() {
  const [users, setUsers] = useState([]);  // List of teachers
  const [user, setUser] = useState(null); // Logged-in user

  useEffect(() => {
    loadUsers();
  }, []); // No infinite loop

  const loadUsers = async () => {
    const storedUser = JSON.parse(localStorage.getItem('login-user'));
    setUser(storedUser);  // Set logged-in user

    try {
      const result = await axios.get("https://backendfindonlinetutor-production.up.railway.app/teacher");
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const reqAdd = async (id) => {
    if (!user) {
      alert("Please Login First.");
      return;
    }

    let user1 = users[id];
    console.log(user1);

    let alreadyApplied = user1.note.some((i) => i.email === user.email);
    if (alreadyApplied) {
      alert("Already applied");
      return;
    }

    user1.note.push(user);

    try {
      const msg = await axios.post("https://backendfindonlinetutor-production.up.railway.app/note", user1);
      alert(msg.data.message);
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  return (
    <div id="Students">
      <h1 style={{ textAlign: "center", textShadow: "3px 5px 5px darkgrey" }}>Tutor List</h1>
      {users.map((user1, index) => (
        <div className='details' key={index}>
          <table>
            <tbody>
              <tr>
                <td><h4>Name: {user1.name}</h4></td>
                <td><h4>Email: {user1.email}</h4></td>
                <td><h4>Fees: {user1.min_fees}-{user1.max_fees} / Month</h4></td>
              </tr>
              <tr>
                <td><h4>Subject: {user1.field}</h4></td>
                <td><h4>Mobile No.: {user1.phone}</h4></td>
                <td><h4>Mode: {user1.mode}</h4></td>
              </tr>
              <tr>
                <td><h4>Education: {user1.edu}</h4></td>
                <td colSpan={2}><h4>Experience: {user1.exp}</h4></td>
              </tr>
              <tr>
                <td colSpan={3}>
                  {user?.profession === "Teacher" ? null : (
                    <button onClick={() => reqAdd(index)} className='btn btn-success'>Apply</button>
                  )}
                  <Link to={`/teacherData/${user1._id}`} className='btn btn-success' style={{ marginLeft: "2%" }}>
                    Show Details
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
