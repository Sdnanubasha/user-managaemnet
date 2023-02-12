import React,{useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import '../components/assets/css/Login.css'
import { useForm } from "react-hook-form";


function LoginPage() {
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const { handleSubmit } = useForm();

  const navigate = useNavigate();

  const HandleLogin =async() =>{
    console.warn(email,password);
    let result = await fetch('http://localhost:3307/api/user/login',{
      method:'post',
      body: JSON.stringify({email,password}),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
    if(result.name){
      localStorage.setItem('user',JSON.stringify(result));
      swal("Login successfully",`Welcome ${result.name}`,"success");
      navigate('/users');
    }else{
      swal("Login failed","credentials are not matched","error");
    }
  }

  const signup =()=>{
    navigate('/register');
  }

  return (
    <>
    <h1 className='mainheading'>User Management</h1>
    <div className="login">
      <form action="" className="form-login" method='post' onSubmit={handleSubmit(HandleLogin)}>
        <h3>Login Here</h3>

        <label htmlFor="email" className="name">Email</label>
        <input type="text" name='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />

        <label htmlFor="password" className="name">Password</label>
        <input type="password" name='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <button className="login-btn" type='submit'>Login</button>
        <p className='new1'>New User ? Register here</p>
        <Link to="/register">
              <button
                className="login-btn"
                id="register"
                name="register"
                onClick={()=>signup()}
              >
                Register
              </button>
              </Link>
      </form>
    </div>
    </>
  )
}

export default LoginPage