import React, { useEffect, useRef, useState } from 'react'
import OtpImage from '../assets/otp_image.svg'
import axios from 'axios';
import { useNavigate } from 'react-router';

const Otp = () => {
    const navigate=useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [userOtp,setUserOtp]=useState('');
    const inputRefs=useRef([]);

    useEffect(()=>{
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const token=localStorage.getItem('token')
            const response=await axios.post('http://localhost:3005/sign/verify',{userOtp,token});
            console.log(response.data);
            console.log(userOtp);
            setOtp(new Array(6).fill(''))
            localStorage.setItem('token',response.data.token);
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (index,e) => { 
        const value = e.target.value;
        if (isNaN(value)) return;
    
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
    
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === 6) setUserOtp(combinedOtp);
    
        if (value && index < 6 - 1 && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
    }
    const handleClick = (index) => { 
        inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
    }
    const handleKeyDown = (index,e) => { 
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
          ) {
            inputRefs.current[index - 1].focus();
          }
    }

    return (
        <div className='bg-blue-50 min-h-screen'>
            <div className='flex justify-center items-center'>
                <div className='flex shadow-black shadow-lg p-10 rounded-md justify-center items-center w-2/3 mt-32'>
                    <img src={OtpImage} alt='' className='max-w-56' />
                    <div className='flex flex-col ml-24'>
                        <h2 className='capitalize font-signature text-blue-600 text-2xl font-medium italic mb-10'>BLOG LAB</h2>
                        <span className='text-white text-base bg-neutral-700 p-3 rounded'>
                            Verify Your E-Mail via one time password (OTP).The OTP is already sent you on your registerd email. Please check your e-mail.
                        </span>
                        <span className='mt-14 text-blue-600 font-medium text-lg'>
                            One Time Password (OTP)
                        </span>
                        <div className='flex mt-5 gap-10'>
                            {

                                otp.map((value, index) => {
                                    return (
                                        <input key={index}
                                            type="text"
                                            ref={(input)=>(inputRefs.current[index]=input)}
                                            value={value}
                                            onChange={(e) => handleChange(index, e)}
                                            onClick={() => handleClick(index)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className='p-2 border rounded text-center w-12 h-12 text-sm focus:border-blue-600' //focus ka color kam nhi kr rha hai
                                        />
                                    )
                                })
                            }

                        </div>
                        <button type='submit' className='bg-blue-600 text-white mt-9 p-2 rounded-lg text-xl font-semibold' onClick={handleSubmit}>
                            Verify OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp