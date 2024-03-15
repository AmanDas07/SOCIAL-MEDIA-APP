'use client'
import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../../context/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCamera } from "react-icons/bs";
import axios from "axios";
const update = () => {
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    const [username, setUsername] = useState("");
    const [about, setAbout] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [state, setState] = useContext(userContext);

    //handle image upload

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

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API}/profile-update`, {
                name,
                username,
                about,
                image,
                email,
                password,
            }, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            });
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            setState({
                ...state,
                user: data,
            });
            toast.success("Profile Update Successfully");
            setLoading(false);
            //   router.push("/login");
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (state && state.user) {
            setUsername(state.user.username);
            setName(state.user.name);
            setAbout(state.user.about);
            setImage(state.user.image);
            setEmail(state.user.email);
            setAnswer(state.user.answer);
        }
    }, [state && state.user]);
    return (
        <div className='container'>
            <div className='row d-flex justify-content-center align-items-center '>
                <div className='col-md-8' />
                <h1 className='d-flex align-items-center justify-content-center mt-3 mb-3'>Profile Details</h1>
                <form className='shadow-lg p-3 mb-5 bg-white rounded' >
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <div className="">
                        <label htmlFor="image" className="ms-4 mt-2">
                            {image && image.url ? (
                                <img
                                    src={image.url}
                                    height={300}
                                    width={300}
                                    className="m-2"
                                />
                            ) : uploading ? (
                                <>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </>
                            ) : (
                                <BsCamera size={40} style={{ cursor: "pointer" }} />
                            )}

                            <input
                                type="file"
                                accept="images/*"
                                onChange={handleImage}
                                name="image"
                                id="image"
                                hidden
                            />
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            aria-describedby="nameHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">
                            About
                        </label>
                        <input
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            aria-describedby="nameHelp"
                            placeholder="enter bio"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            aria-describedby="nameHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>

                    <div className="d-flex flex-row">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary btn-lg"
                        >
                            {loading ? (
                                <>
                                    <span>Loading &nbsp;</span>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                </>
                            ) : (
                                "update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default update;