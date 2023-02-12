import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import '../components/assets/css/Users.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersPage() {
  const [data,setData] = useState([]);

  const getData = async()=>{
    const result = await axios.get('http://localhost:3307/api/users');
    setData(result.data);
  }

  const deleteUser = (id)=>{
    swal({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      buttons: [
        'No',
        'Yes'
      ],
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios.delete(`http://localhost:3307/api/user/${id}`)
          .then(res => {
            swal({
              title: "Done!",
              text: "user is deleted",
              icon: "success",
              timer: 500,
              button: false
            })
            if(res){
              getData();
            }
        }).catch(err => {
          console.log(err);
        })
        
      }else {
        swal("Cancelled", "User data is safe", "error");
      }
    });  
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    <h1 className='mainheading'>User Management</h1>
    <ToastContainer/>
    <Link to={`/adduser`}><button className="adduser-btn">Add User</button></Link>
    <div className="main-table">
      <table className='table-outcut'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>email</th> 
            <th id='operations'>operations</th> 
          </tr>
        </thead>
        <tbody>
          {data.map((user,index)=>(
          <tr key={user.id}>
            <th scope='row'>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className='operation-data'>
              <Link to={`/edituser/${user.id}`}>
              <button className="edit-btn">edit</button>
              </Link>
              <Link onClick={()=>deleteUser(user.id)}>
              <button className="delete-btn">delete</button>
              </Link>
              <Link to={`/viewuser/${user.id}`}>
              <button className="view-btn">view</button>
              </Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default UsersPage