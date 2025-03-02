import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";
export default function Search() {
  const [users,setUser]= useState([]);
  const [user,set]=useState({});
  
  
  useEffect(()=>{
    loadUsers()
  },[]);
  const loadUsers=async ()=>{
    
     set(await JSON.parse(localStorage.getItem('login-user')));
    const result=await axios.get("https://backendfindonlinetutor-production.up.railway.app/teacher");
    let subject=document.getElementById("subject").value;
    const user2=[];
    result.data.forEach(i=>{
        if(i.field===subject){
            user2.push(i);
        }
    })
    setUser(user2);
    
        
   
  }
  const reqAdd=async id=>{
    if(!user){
      alert("Please Login First .")
    }
    let user1=users[id];
    console.log(user1);
    let flag=false;
    user1.note.forEach(i=>{
      if(i.email===user.email && !flag){
        alert("already applied");
        flag=true;
      }
    })
    user1.note.push(user);
    if(!flag){
        const msg=await axios.post("http://localhost:9802/note",user1);
        alert(msg.data.message);
    }
  }
  
  return (
    <div id="Students">
        <h1 style={{textAlign:"center",textShadow:"3px 5px 5px darkgrey"}}>Select Subject</h1>  
        <select id="subject" name="field" className='form-control dropdown' style={{width:"70%",marginLeft:"15%"}}>
                <option>Select</option>
                <option value={"Full Stack"}>Full Stack</option>
                <option value={"Java"}>Java</option>
                <option value={"CPP"}>CPP</option>
                <option value={"Python"}>Python</option>
                <option value={"C"}>C</option>
        </select>
        <button className='btn btn-success' onClick={()=>loadUsers() }style={{marginLeft:"45%",marginTop:"1%",width:"20vh"}}  >Search</button>
      <h1 style={{textAlign:"center",textShadow:"3px 5px 5px darkgrey",}}>Tutor List</h1>
      {users.map((user1,index)=>(
          
          <div className='details' key={index}>
            <table >
              <tr>
                  <td><h4>Name : {user1.name}</h4></td>
                  <td><h4>Email : {user1.email}</h4></td>
                  <td><h4>Fees : {user1.min_fees}-{user1.max_fees} / Month .</h4></td>
              </tr>
              <tr>
                   <td><h4>Subject : {user1.field}</h4></td>
                   <td><h4>Mobile No. : {user1.phone}</h4></td>
                   <td><h4>Mode : {user1.mode}</h4></td>
              </tr>
              <tr>
                <td>
                   <h4>Education : {user1.edu}</h4>
                </td>
                <td colSpan={2}><h4>Experience : {user1.exp}</h4></td>
              </tr>
              <tr><td colSpan={3}>{user && user.profession==="Teacher"?<></>:<button  onClick={()=>reqAdd(index)} className='btn btn-success'>Apply</button>}</td></tr>
            </table>
            
            
          </div>
      ))}
      
    </div>
  )
}