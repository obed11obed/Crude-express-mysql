import { Link, useParams } from "react-router-dom";
import { useState, useEffect, } from "react"
import axios from "axios"
import Update from "./Update";
import Creat from "./Creat";

export default function Users() {
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
       axios.get("http://localhost:3000/").then((res) => setUsers(res.data))
       .catch((err) => console.log(err))
    },[]);

    const handleDelete = (id) =>{
      axios.delete('http://localhost:3000/delete/'+id)
      .then(res => window.location.reload())
      .catch(err => console.log(err));
    }
    return (
      <div className="container">
      <h2>User's Record</h2>
      <Link to={'Creat'} className="btn btn-info">Create a New User</Link>
      <table className="table">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        { users.map(user =>
        <tr key={user.id}>
          <td>{user.id}</td>  
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
          
        <td> <Link to={`/Update/${user.id}`} className="btn btn-primary" >Update User</Link></td>
        <td> <button className="btn btn-danger" onClick={()=>handleDelete(user.id)}>Delete User</button></td>
      </tr>)
  }
      </tbody>
    </table>

  
    </div>
     
    )
}