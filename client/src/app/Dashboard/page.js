'use client'

import React, { useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useContext } from "react";
import UserRoute from '../Components/routes/userRoute.js';
import { useRouter } from 'next/navigation.js';
import { userContext } from '../../../context/page.js';
import axios from 'axios';
import CreatePost from '../Components/Posts/CreatePost.js';
import { toast, ToastContainer } from 'react-toastify';
import FormData from 'form-data'
import PostLists from '../Components/Posts/postLists.js';
import PeopleComp from '../Components/PeopleComp/page.js';
const Dashboard = () => {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const [state] = useContext(userContext);
    const route = useRouter();
    //const { content } = useRef("");
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState({});
    const [people, setPeople] = useState([]);
    const [posts, setPosts] = useState([]);



    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        console.log([...formData]);
        setUploading(true);
        try {

            /*
    */
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/upload-image`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${state.token}`,
                    }
                }
            );
            // console.log("Image Upload", data);
            setUploading(false);
            setImage({
                url: data.url,
                public_id: data.public_id,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const findPeople = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/find-people`, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            })
            setPeople(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (state && state.token) {
            fetchUserPosts();
            findPeople();
        }
    }, [state && state.token])

    const fetchUserPosts = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/user-posts`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${state.token}`,
                    }
                });
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/createpost`, { content, image }, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            });
            setContent("");
            setImage({});
            fetchUserPosts();
            toast.success("Successfully Posted");
        }
        catch (error) {
            toast.error(error);
            console.log(error);
        }

    }

    const deletePost = async (post) => {
        try {
            const answer = window.confirm("Are You Sure ?");
            if (!answer) { return; }

            else {
                const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-post/${post._id}`, {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    }
                });

                toast.success("Post Deleted");
                fetchUserPosts();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const likePost = async (post_id) => {
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API}/like-post`, { post_id }, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            });
            if (data.ok == true) {
                console.log("Like is registered" + data.ok);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const unlikePost = async (_id) => {
        try {

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/unlike-post/${_id}`, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            });

        } catch (error) {
            console.log(error);
        }
    }






    return (
        <UserRoute>
            <div className="row">
                <div className="col-md-8">
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
                    <CreatePost content={content} setContent={setContent} handlePostSubmit={handlePostSubmit} handleImage={handleImage} image={image} uploading={uploading} />
                    <PostLists posts={posts} deletePost={deletePost} likePost={likePost} unlikePost={unlikePost} />
                </div>
                <div className="col-md-4">
                    <div>{/**/}</div>
                    <PeopleComp people={people} />
                </div>
            </div>
        </UserRoute>




    )
}

export default Dashboard;