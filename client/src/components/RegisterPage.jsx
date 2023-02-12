import React,{useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import '../components/assets/css/Register.css';
import axios from 'axios';
import { useForm } from "react-hook-form";


function RegisterPage() {
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [cpassword, setcPassword] =useState('');
  const navigate = useNavigate();
  const { register,handleSubmit, watch, formState: { errors } } = useForm({
    mode:'onTouched'
  });

  const collectData = async () =>{
    console.warn(name,email,password);
      let result = await axios.post('http://localhost:3307/api/user/register',{name,email,password})
     if(!result){
      console.log(result);
     }
      swal("Login successfully",`Welcome Dear User`,"success");
      navigate('/')
     console.warn(result);
     }

  const signin = () =>{
    navigate('/');
  }

  watch('password');

  return (
    <>
    <h1 className='mainheading'>User Management</h1>
    <div className="login">
      <form action="" className="form-register" method='post' onSubmit={handleSubmit(collectData)}>
        <h3>Register Here</h3>

        <label htmlFor="name" className="name">Name</label>
        <input type="text" name='name' placeholder='enter name' value={name} onChange={(e)=>setName(e.target.value)} />

        <label htmlFor="email" className="name">Email</label>
        <input type="text" name='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div>
        <label htmlFor="password" className="name">Password</label>
        <input type="password" className={`form-control ${ errors.password &&
                "focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                {...register("password", { required: 'Password is required',
                    minLength:{
                        value:8,
                        message:'Minimum Required length is 8'
                    },
                    maxLength: {
                        value: 20,
                        message: "Maximum Required length is 20",
                      },
                 })}
                name="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="enter password"/>
                {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                </div>
        <div>
        <label htmlFor="cpassword" className="name">Confirm Password</label>
        <input type="password" className={`form-control ${ errors.confirmPassword &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"} `}
              {...register("confirmPassword", { required: 'confirm password is required',
              validate: (value) =>
              value === password || "The passwords do not match",
              })}
                name="confirmPassword"
                value={cpassword}
                onChange={(e)=>{setcPassword(e.target.value)}}
                placeholder="confirm password"/>
                {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}
        </div>
        <button className="register-btn" type='submit'>Register</button>
        <p className='new'> Or LoginHere</p>
        <Link to="/">
              <button
                name="signin"
                className='register-btn'
                onClick={()=>signin()}
              >
                Login
              </button>
              </Link>
      </form>
    </div>
    </>
  )
}

export default RegisterPage