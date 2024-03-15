'use client'

import React from 'react'
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from 'next/navigation.js';
import moment from "moment";
import { userContext } from '../../../../../context/page';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import PostComment from '@/app/Components/Posts/PostComment';
import { FaTrashAlt } from "react-icons/fa";
const page = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { _id } = useParams();
    const [state, setState] = useContext(userContext);

    const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/get-comments/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            );
            setPost(data.post);
            setComments(data.comment);
        } catch (error) {

            console.error('Error fetching comments:', error);

        }
    };

    const handleCommentSubmit = async (comment) => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/post-comments`, { comment, _id },
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    }
                })
            if (data.ok === true) {
                toast.success("Comment added successfully");
                fetchData();
            }
            else {
                toast.error("Something went wrong");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const removeComment = async (comment) => {
        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/delete-comment`, { comment, post },
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            );

            if (data.delete === true) {
                toast.success("Your comment has been removed");
                fetchData();
            }
            else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (

        <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-10 ">
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {comments.length !== 0 ? (comments.map((comment) => (
                    <div key={comment.postedBy}>

                        <div className="card m-5 ">







                            <div className="card-header">
                                <div>

                                    {comment.postedBy.image ? (<img
                                        src={comment.postedBy.image}
                                        alt="userpic"
                                        height={30}
                                        width={30}
                                    />) : (<img
                                        src={defaultImage}
                                        alt="userpic"
                                        height={30}
                                        width={30} />)
                                    }

                                    <span className="ms-2">{post.postedBy.name}</span>
                                    <span className="ms-3">
                                        {moment(comment.created).fromNow()}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div dangerouslySetInnerHTML={{ __html: `${comment.text}` }} />
                            </div>
                            {state && state.user && state.user._id === comment.postedBy && (<div className="card-footer">
                                <div className='d-flex flex-row m-2'>
                                    <FaTrashAlt style={{ cursor: 'pointer' }} color='red' size={25} onClick={() => { removeComment(comment) }} />
                                </div>
                            </div>)}


                        </div>

                    </div>
                ))) : (
                    <>
                        <h2 className="d-flex justify-content-center align-items-center" style={{ marginTop: "36vh" }}>"No Comments available"</h2>
                    </>
                )}









                <div>
                    <PostComment handleCommentSubmit={handleCommentSubmit} />
                </div>

            </div>
        </div>

    )

}

export default page