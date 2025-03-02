import React, { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    loadUser();
  });  // Dependency array should be empty to avoid infinite re-renders

  const loginPro = () => {
    localStorage.clear();
    document.getElementById("logOut").style.display = "none";
    document.getElementById("login").style.display = "inline-block";
    document.getElementById("imal").style.display = "none";
    document.getElementById("namel").style.display = "none";
    document.getElementById("namel").innerHTML = "";
    window.reload();  // Corrected from `window.reload()`
  }

  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('login-user'));
    setUser(storedUser);
    
    if (storedUser) {
      document.getElementById("logOut").style.display = "inline-block";
      document.getElementById("login").style.display = "none";
      document.getElementById("namel").innerHTML = storedUser.name;
    } else {
      document.getElementById("logOut").style.display = "none";
      document.getElementById("login").style.display = "inline-block";
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item'>
              <img src="https://www.tutorup.com/wp-content/uploads/2021/08/TutorUp-logo_green.png" width="130vw" height="50vh" alt="Logo" />
            </li>
            <li className="nav-item">
              {user && user.profession === "Teacher" ? <NavLink to={`/Homepage/${user._id}`} id="homeBtn" style={{ fontSize: "22px" }} className='nav-link'>Notifications</NavLink> : null}
            </li>
            <li className="nav-item">
              {user ? <NavLink to="/Students" id="Cust" style={{ fontSize: "22px" }} className='nav-link'>Tutors</NavLink> : null}
            </li>
            <li className="nav-item">
              {user ? <NavLink to="/search" id="Empl" style={{ fontSize: "22px" }} className='nav-link'>Search</NavLink> : null}
            </li>
            <li className="nav-item">
              <NavLink to="/About" style={{ fontSize: "22px" }} className='nav-link'>About</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item"><h3 id="namel" style={{ color: "white" }}> </h3></li>
            <li className="nav-item"><img alt="logo" src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" style={{ width: "3vw", marginLeft: "6px", borderRadius: "50%" }} id="imal" /></li>
          </ul>
          <Link to="/login" className='btn btn-outline-light m-2' id="login">Login</Link>
          <Link to="/" onClick={loginPro} className='btn btn-outline-light m-2' id="logOut">LogOut</Link>
        </div>
      </nav>
    </div>
  );
}
