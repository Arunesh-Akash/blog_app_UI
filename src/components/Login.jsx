import React, { useState } from 'react'
import LoginImage from '../assets/login_image.svg'
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:3005/login', {email, password });
            console.log(response.data);
            localStorage.setItem('token',response.data.token);
            setEmail('');
            setPassword('');
            navigate('/home')
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className='bg-blue-50 min-h-screen'>
            <div className='flex justify-center items-center'>
                <div className='flex shadow-black shadow-lg p-12 rounded-lg justify-center items-center w-2/3 mt-32'>
                    <img src={LoginImage} alt='' className='max-w-56' />
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col ml-24'>
                            <h2 className='capitalize font-signature text-blue-600 text-2xl font-medium italic mb-10'>BLOG LAB</h2>
                            <label>Email</label>
                            <input type='email' placeholder='Email' className='bg-neutral-300 rounded-md p-2 text-black mt-2 mb-2' value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                            <label>Password</label>
                            <input type='password' placeholder='Password' className='bg-neutral-300 rounded-md p-2 text-black mt-2 mb-4' value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                            <button type='submit' className='bg-blue-600 text-white font-semibold p-2 rounded-md mb-2'>
                                Login
                            </button>
                            <div className='mx-4'>
                                <span className='text-sm'>
                                    Already haven't an account?<Link to={'/signup'}><span className='ml-1 text-blue-600 underline'>Sign up</span></Link>
                                </span>
                            </div>
                            <div className='flex justify-center items-center mt-4 gap-8'>
                                <button><FcGoogle size={30} /></button>
                                <button><ImFacebook2 size={30} /></button>
                                <button><FaLinkedin size={30} /></button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login