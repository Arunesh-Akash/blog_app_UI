import React, { useState } from 'react'
import LoginImage from '../assets/login_image.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { object, string } from 'yup';


const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    let userSchema = object({
        name: string().required('Name is required!'),
        email: string().email('Email not valid').required('Email is required!'),
        password: string().required('Password is required!').min(6,"Password must be atleast 6 character")
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await userSchema.validate({ name, email, password }, { abortEarly: false })
            const response = await axios.post('http://localhost:3005/sign', { name, email, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setName('');
            setEmail('');
            setPassword('');
            navigate('/otp')
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach(err => (
                    validationErrors[err.path] = err.message
                ))
                setError(validationErrors);
            }
            else {

                console.log(error);
            }
        }

    }
    return (
        <div className='bg-blue-50 min-h-screen'>
            <div className='flex justify-center items-center'>
                <div className='flex shadow-black shadow-lg p-10 rounded-md justify-center items-center w-2/3 mt-32'>
                    <img src={LoginImage} alt='' className='max-w-56' />
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col ml-24'>
                            <h2 className='capitalize font-signature text-blue-600 text-2xl font-medium italic mb-10'>BLOG LAB</h2>
                            <label>Name</label>
                            <input type='text' placeholder='Name' className='bg-neutral-300 rounded-md p-2 mt-2 mb-2' value={name}
                                onChange={(e) => setName(e.target.value)} />
                            {error.name && <p className='text-red-600 text-sm'>{error.name}</p>}
                            <label>Email</label>
                            <input type='email' placeholder='Email' className='bg-neutral-300 rounded-md p-2 mt-2 mb-2' value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {error.email && <p className='text-red-600 text-sm'>{error.email}</p>}

                            <label>Password</label>
                            <input type='password' placeholder='Password' className='bg-neutral-300 rounded-md p-2 mt-2 mb-2' value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {error.password && <p className='text-red-600 text-sm'>{error.password}</p>}

                            <button type='submit' className='bg-blue-600 text-white font-semibold p-2 rounded-md mb-2 mt-4'>
                                Sign up
                            </button>

                            <div className='mx-4'>
                                <span className='text-sm'>
                                    Already have an account?<Link to={'/login'}><span className='ml-1 text-blue-600 underline'>Login</span></Link>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup