import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Community from '../assets/community.svg';
import Support from '../assets/support.svg';
import Statistics from '../assets/statistics.svg'
import { FaChevronCircleDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { UserContext } from '../Context/UserContext';
import axios from 'axios';


const Dashboard = () => {
    const { currentUser } = useContext(UserContext)

    const data = [
        {
            src: Community,
            title: 'Unique Community',
            subtitle: 'Blog Lab encourages networking among writers and reader engagement to cultivate a community.'
        },
        {
            src: Statistics,
            title: 'Statistics and Analytics',
            subtitle: `Track the performance of your posts. See which ones are getting more attention and who's reading them.`
        },
        {
            src: Support,
            title: 'Mobile and Web Support',
            subtitle: 'Blog Lab is available on any device, anywhere. With our mobile app, you can access your posts anytime, anywhere.'
        }
    ]

    const faq = [
        'What is Blog Lab', 'How can I personlize my blog posts with Blog Lab', 'Is Blog Lab suitable for business and content marketing?',
        'Can I use Blog Lab on the go?', `How does Blog Lab's analytics feature benefit bloggers?`
    ]
    const [postData, setPostData] = useState([]);
    const [content, setContent] = useState('');
    const [showCommentDialog, setShowCommentDialog] = useState(false);
    const [likeClicked, setLikeClicked] = useState(false);
    const [unLikeClicked, setUnLikeClicked] = useState(false);
    const name = currentUser?.name || '';
    const email = currentUser?.email || '';


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/dashboard/all');
                setPostData(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [postData])

    async function handlePost() {
        try {
            const response = await axios.post('http://localhost:3005/dashboard', { email, name, content });
            console.log(response.data);
            setContent('');
        } catch (error) {
            console.log(error)
        }
    }
    function toggleCommentDialog() {
        setShowCommentDialog(!showCommentDialog);
    }

    return (
        <div>
            <Navbar />
            <div className='flex mt-8 gap-2'>
                <div className='w-1/4 ml-5'>
                    <div className='flex flex-col gap-5  sticky top-0'>
                        {
                            data.map(({ src, title, subtitle }) => {
                                return (
                                    <>
                                        <div className='flex flex-col bg-blue-50 justify-center items-center p-2 rounded-lg'>
                                            <img src={src} alt='' className='max-w-32' />
                                            <p className='mt-2 text-lg font-semibold'>
                                                {title}
                                            </p>
                                            <p className='mt-2 text-sm ml-5'>
                                                {subtitle}
                                            </p>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
                <div className='w-1/2 bg-white'>
                    <div className='flex justify-center items-center shadow-black shadow-lg p-4 rounded-lg mx-5'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-4'>
                                <FaRegUser size={20} />
                                <h2 className='text-lg font-semibold text-gray-500 italic cursor-pointer capitalize'>{name}</h2>
                            </div>
                            <h2 className='text-lg font-semibold text-blue-600'>Create a Post</h2>
                            <textarea className='border border-black bg-neutral-50 rounded-lg p-2 text-gray-600' placeholder='What on your mind?' value={content} rows={5} cols={70} onChange={(e) => setContent(e.target.value)} />
                            <div className='justify-end'>
                                <button className='bg-blue-600 p-4 text-white rounded-lg flex gap-2 justify-center items-center font-semibold text-lg' onClick={handlePost}>
                                    Post
                                    <IoMdSend size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        postData.map((post) => {
                            return (
                                <>
                                    <div key={post._id} className='flex flex-col shadow-black shadow-lg p-4 rounded-lg mx-5 mt-10 gap-4'>
                                        <div className='flex items-center gap-4'>
                                            <FaRegUser size={20} />
                                            <h2 className='text-lg font-semibold text-gray-500 italic cursor-pointer capitalize'>{post.name}</h2>
                                        </div>
                                        <div className='border border-black rounded-lg p-4'>

                                            {post.content}
                                        </div>
                                        <div className='flex gap-5'>
                                            <button onClick={() => { setLikeClicked(!likeClicked); setUnLikeClicked(false) }}>
                                                {likeClicked ? <BiLike size={25} className='text-blue-600' /> : <BiLike size={25} />}

                                            </button>
                                            <button onClick={() => { setUnLikeClicked(!unLikeClicked); setLikeClicked(false) }}>
                                                {unLikeClicked ? <BiDislike size={25} className='text-blue-600' /> : <BiDislike size={25} />}

                                            </button>
                                            <button onClick={toggleCommentDialog}>

                                                <BiCommentDetail size={25} />
                                            </button>
                                        </div>
                                        {showCommentDialog && (
                                            <div className="mt-1 ml-24 flex">
                                                <textarea
                                                    className="border border-black bg-neutral-50 rounded-lg p-2 text-gray-600"
                                                    placeholder="Write a comment..."
                                                    rows={2}
                                                    cols={40}
                                                />
                                                <button className='bg-blue-600 text-white p-2 ml-2 rounded-lg items-center justify-center '>

                                                    <IoMdSend size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
                <div className='w-1/4 '>
                    <div className='flex flex-col sticky top-0'>
                        <h2 className='text-2xl font-semibold mb-7'>Frequently Asked Questions (FAQ)</h2>
                        {
                            faq.map((value) => {
                                return (
                                    <>
                                        <div className='flex justify-between items-center mr-4 border border-black p-4 rounded-md mb-5'>
                                            <div className='text-sm font-semibold'>
                                                {value}
                                            </div>
                                            <div>
                                                <FaChevronCircleDown size={20} />
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard