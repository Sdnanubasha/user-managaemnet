import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/assets/css/Adduser.css'
const AddUser =() =>{
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
         toast.success('User Added Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          navigate('/users')
         console.warn(result);
         }
         watch('password');

    return(
        <>
            <h1 className='mainheading'>User Management</h1>
            
    <div className="login">
      <form action="" className="form-register" method='post' onSubmit={handleSubmit(collectData)}>
        <h3>Enter User Details</h3>
        
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
        <button className="register-btn1" type='submit'>Add User</button>
        <Link to={'/users'}><button className="register-btn1" type='submit'>Back</button></Link>

      </form>
    </div>
        </>
    )
}

export default AddUser;