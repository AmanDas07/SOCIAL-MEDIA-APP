'use client'

import React, { useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from 'next/navigation.js';
import { userContext } from '../../../../context/page';
import axios from 'axios';
import CreatePost from '@/app/Components/Posts/CreatePost';
import { toast, ToastContainer } from 'react-toastify';
import FormData from 'form-data'
const PostEdit = () => {
    const router = useRouter();
    const { _id } = useParams();
    const [state, setState] = useContext(userContext);
    const [post, setPost] = useState({});
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/user-posts/${_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${state.token}`,
                        }
                    })
                setPost(data);
                setContent(data[0].content);
                setImage(data[0].image);
            }
            catch (error) {
                console.log(error);
            }


        }
        if (_id) { fetchPost(); }
    }, [])
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

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API}/user-posts/${_id}`, { content, image },
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    }
                });
            if (data.error) {
                toast.error(error);
            } else {
                console.log(data);
                toast.success("Updated Successfully");
                router.push("/Dashboard");
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
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

            </div>

        </div>
    )
}
export default PostEdit;