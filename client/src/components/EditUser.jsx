import React,{useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/assets/css/Adduser.css'

const EditUser =() =>{
    const [name, setName] =useState('');
    const [password, setPassword] =useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const { register,handleSubmit, watch, formState: { errors } } = useForm({
        mode:'onTouched'
      });
    const {id} = useParams();

    const getData = async() =>{
        try {
            let user = await axios.get(`http://localhost:3307/api/user/${id}`)
            setData(user.data);
            if(user.data.name){
                setName(user.data.name)
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        getData();
    },[])



      const collectData = async () =>{
        console.warn(name,password);
        try{ 
        let result = await axios.put(`http://localhost:3307/api/user/${id}`,{name,password})

         if(!result){
          console.log(result);
         }
         toast.success('User Updated Successfully', {
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
         }catch(e){
            console.log(e)
         }
        }
         watch('password');

    return(
        <>
        <h1 className='mainheading'>User Management</h1>  
            <div className="login">
                <form action="" className="form-register" method='post' onSubmit={handleSubmit(collectData)}>
                    <h3>Update User Details</h3>
        
                    <label htmlFor="name" className="name">Name</label>
                    <input type="text" name='name' placeholder='enter name' value={name} onChange={(e)=>setName(e.target.value)} />

                    <label htmlFor="email" className="name">Email</label>
                    <input disabled type="text" name='email' placeholder='enter email' value={data.email} />
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
                    <button className="register-btn1" type='submit'>Update</button>
                    <Link to={'/users'}><button className="register-btn1" type='submit'>Back</button></Link>

                </form>
            </div>
        </>
    )
}

export default EditUser;