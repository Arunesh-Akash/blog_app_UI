import React, { useContext } from 'react';
import { RiUserSharedFill, RiUserReceived2Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const Navbar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const name = currentUser?.name || '';

    function handleLogout(e) {
        try {
            e.preventDefault();
            localStorage.removeItem('token');
            setCurrentUser(null); 
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-blue-100 p-6 flex justify-between items-center'>
            <div>
                <h2 className='capitalize font-signature text-blue-600 text-2xl font-medium'>BLOG LAB</h2>
            </div>
            <div>
                <ul className='flex gap-8 items-center'>
                    <li className='hover:text-neutral-500 cursor-pointer'>Features</li>
                    <li className='hover:text-neutral-500 cursor-pointer'>Blog</li>
                    <li className='hover:text-neutral-500 cursor-pointer'>About us</li>
                    {currentUser ? (
                        <div className='flex-col gap-2 justify-center' onClick={handleLogout}>
                            <li className='hover:text-neutral-500 cursor-pointer'><RiUserReceived2Fill size={20} /></li>
                            <li className='hover:text-neutral-500 cursor-pointer capitalize'>{name}</li>
                        </div>
                    ) : (
                        <Link to={'/login'}>
                            <li className='hover:text-neutral-500 cursor-pointer'><RiUserSharedFill size={23} /></li>
                        </Link>
                    )}
                    <button className='bg-blue-600 p-2 text-white rounded-md hover:bg-blue-500 font-medium'>
                        Reach out to us
                    </button>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
