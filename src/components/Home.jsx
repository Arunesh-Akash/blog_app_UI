import React from 'react'
import Navbar from './Navbar'
import BlogHome from '../assets/blog_home.svg';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='flex mt-56 justify-between items-center gap-20'>
                <div className='flex flex-col pl-36'>
                    <h2 className='text-5xl font-bold text'>Blog Lab</h2>
                    <p className='mt-4 font-medium'>
                        Blog Lab is an application designed to boost the creativity and engagement of blog writers. It helps you create the beautiful and original blog posts in just a few steps while also allowing you to reach a wide readership.
                    </p>
                    <button className='bg-blue-600 text-white p-2 mt-4 w-40 rounded-md font-medium hover:bg-blue-500'>
                        Learn More
                    </button>
                </div>
                <div className='pr-56'>
                    <img src={BlogHome} alt='' className='max-w-lg'/>
                </div>
            </div>
        </div>
    )
}

export default Home