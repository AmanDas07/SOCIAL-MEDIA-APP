'use client'



import React, { useContext, useEffect, useState } from 'react'
import RootLayout from '../layout.js';
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { Axios } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation.js';
import Link from 'next/link.js';
import { userContext } from '../../../context/page.js';
const Register = () => {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [answernum, setAnswernum] = useState("1");
    const [loading, setLoading] = useState(false);
    const Router = useRouter();
    const [state, setState] = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/Register`, {
                name,
                email,
                password,
                answer,
                answernum
            });
            toast.success("User Registered Successfully");
            setLoading(false);
            Router.push("/login");
        }
        catch (error) {
            toast.error(error.response.data);
            setLoading(false);
        }


        //console.log("name:" + name, "email:" + email, answer, password);
    }
    if (state) { Router.push("/"); }
    return (
        <div className='container'>
            <div className='row d-flex justify-content-center align-items-center '>
                <div className='col-md-8' />
                <h1 className='d-flex align-items-center justify-content-center mt-3 mb-3'>Register</h1>
                <form className='shadow-lg p-3 mb-5 bg-white rounded' >
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
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={name} onChange={(event) => { setName(event.target.value) }
                        } />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => { setEmail(event.target.value) }
                        } />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => { setPassword(event.target.value) }
                        } />
                    </div>
                    <label className="form-label">Reset Question</label>
                    <div className="mb-3">

                        <select name="answer" id="answer" onChange={(event) => setAnswernum(event.target.value)}>
                            <option value={1} >What is your Favourite Food ?</option>
                            <option value={2} >Who is your Favourite Teacher ?</option>
                            <option value={3} >What is your Job title ?</option>
                        </select>
                    </div>
                    <div className="mb-3">

                        <input type="text" className="form-control" id="exampleInputAnswer"
                            value={answer} onChange={(event) => {
                                setAnswer(event.target.value)
                            }} />
                    </div>
                    <div className='d-flex '>
                        <button type="submit" className="btn btn-primary " onClick={handleSubmit} disabled={!name || !password || !email || !answer}>{
                            loading ? (<>
                                <span>Loading &nbsp;</span>
                                <span className='spinner-border spinner-border-sm' role='status' area-hidden='true'></span>
                            </>) : ('Register')
                        }</button>
                        <p className='m-3'>Already Registered ?  <Link href="/login">Click here...</Link></p>
                    </div>

                </form>
            </div>
        </div>


    )
}

export default Register;


