import React, { useContext, useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import Community from '../assets/community.svg';
import Support from '../assets/support.svg';
import Statistics from '../assets/statistics.svg';
import { FaChevronCircleDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import { UserContext } from '../Context/UserContext';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { MdPhotoLibrary } from "react-icons/md";
import axios from 'axios';

const Dashboard = () => {
    const { currentUser } = useContext(UserContext);

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
    ];

    const faq = [
        'What is Blog Lab', 'How can I personalize my blog posts with Blog Lab', 'Is Blog Lab suitable for business and content marketing?',
        'Can I use Blog Lab on the go?', `How does Blog Lab's analytics feature benefit bloggers?`
    ];

    const [postData, setPostData] = useState([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [activeCommentPostId, setActiveCommentPostId] = useState('');
    const [commentData, setCommentData] = useState({});
    const [comment, setComment] = useState('');
    const name = currentUser?.name || '';
    const email = currentUser?.email || '';
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/blog/all?email=${email}`);
                setPostData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [email]);

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:3005/comment?postId=${postId}`);
            setCommentData(prevData => ({ ...prevData, [postId]: response.data }));
        } catch (error) {
            console.log(error);
        }
    };

    async function handlePost() {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('name', name);
            formData.append('content', content);
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post('http://localhost:3005/blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setContent('');
            setImage(null);

            const fetchResponse = await axios.get(`http://localhost:3005/blog/all?email=${email}`);
            setPostData(fetchResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleFileChange(event) {
        setImage(event.target.files[0]);
    }

    async function handleLike(id) {
        try {
            const response = await axios.get(`http://localhost:3005/like?email=${email}&_id=${id}`);
            setPostData(prevData =>
                prevData.map(post =>
                    post._id === id ? { ...post, liked: response.data.message } : post
                )
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleComment(postId) {
        try {
            const response = await axios.post('http://localhost:3005/comment', { name, comment, postId });
            console.log(response.data);
            setComment('');
            fetchComments(postId);
        } catch (error) {
            console.error(error);
        }
    }

    function toggleCommentDialog(postId) {
        if (activeCommentPostId === postId) {
            setActiveCommentPostId('');
        } else {
            setActiveCommentPostId(postId);
            fetchComments(postId);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex mt-8 gap-2'>
                <div className='w-1/4 ml-5'>
                    <div className='flex flex-col gap-5 sticky top-0'>
                        {data.map(({ src, title, subtitle }) => (
                            <div key={title} className='flex flex-col bg-blue-50 justify-center items-center p-2 rounded-lg'>
                                <img src={src} alt='' className='max-w-32' />
                                <p className='mt-2 text-lg font-semibold'>{title}</p>
                                <p className='mt-2 text-sm ml-5'>{subtitle}</p>
                            </div>
                        ))}
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
                            <textarea
                                className='border border-black bg-neutral-50 rounded-lg p-2 text-gray-600'
                                placeholder='What on your mind?'
                                value={content}
                                rows={5}
                                cols={70}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <div className='flex items-center gap-2'>
                                <MdPhotoLibrary size={25} onClick={() => fileInputRef.current.click()} className='cursor-pointer' />
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {image && <span>{image.name}</span>}
                            </div>
                            <div className='justify-end flex-row'>
                                <button
                                    className='bg-blue-600 p-4 text-white rounded-lg flex gap-2 justify-center items-center font-semibold text-lg'
                                    onClick={handlePost}
                                >
                                    Post
                                    <IoMdSend size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {postData.map(post => (
                        <div key={post._id} className='flex flex-col shadow-black shadow-lg p-4 rounded-lg mx-5 mt-10 gap-4'>
                            <div className='flex items-center gap-4'>
                                <FaRegUser size={20} />
                                <h2 className='text-lg font-semibold text-gray-500 italic cursor-pointer capitalize'>{post.name}</h2>
                            </div>
                            <div className='border border-black rounded-lg p-4'>
                                {post.image && <img src={`http://localhost:3005${post.image}`} alt="Post" className="mt-2" />}
                                {post.content}
                            </div>
                            <div className='flex gap-5'>
                                <button onClick={() => handleLike(post._id)}>
                                    {post.liked ? <IoMdHeart size={25} className='fill-red-600' /> : <IoMdHeartEmpty size={25} />}
                                </button>
                                <button onClick={() => toggleCommentDialog(post._id)}>
                                    <BiCommentDetail size={25} />
                                </button>
                            </div>
                            {activeCommentPostId === post._id && (
                                <div className="mt-1 ml-24 flex flex-col gap-2">
                                    {commentData[post._id]?.map(comment => (
                                        <div key={comment._id} className='flex flex-col items-start shadow-black p-2'>
                                            <div className=' flex flex-row gap-2 items-center '>
                                                <FaRegUser size={20} />
                                                <h2 className='text-lg font-semibold text-gray-500 italic capitalize'>{comment.name}</h2>
                                            </div>
                                            <div className='ml-6'>{comment.comment}</div>
                                            <hr className='border-t border-gray-300 w-1/2 mt-2'/>
                                        </div>
                                    ))}
                                    <div className='flex items-center gap-2'>
                                        <textarea
                                            className="border border-black bg-neutral-50 rounded-lg p-2 text-gray-600"
                                            placeholder="Write a comment..."
                                            rows={1}
                                            cols={40}
                                            onChange={(e) => setComment(e.target.value)}
                                            value={comment}
                                        />
                                        <button
                                            className='bg-blue-600 text-white p-2 rounded-lg items-center justify-center'
                                            onClick={() => handleComment(post._id)}
                                        >
                                            <IoMdSend size={23} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='w-1/4 '>
                    <div className='flex flex-col sticky top-0'>
                        <h2 className='text-2xl font-semibold mb-7'>Frequently Asked Questions (FAQ)</h2>
                        {faq.map(value => (
                            <div key={value} className='flex justify-between items-center mr-4 border border-black p-4 rounded-md mb-5'>
                                <div className='text-sm font-semibold'>{value}</div>
                                <div><FaChevronCircleDown size={20} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
