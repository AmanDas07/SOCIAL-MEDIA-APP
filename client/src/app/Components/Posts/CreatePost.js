'use client'
import React, { useEffect, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import { IoMdCamera } from "react-icons/io";
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false
})
const CreatePost = ({ content, setContent, handlePostSubmit, handleImage, image, uploading }) => {

    return (


        <div className="card mt-4" style={{ width: '774px', marginLeft: "35px" }}>
            {image && image.url ? (<div className='d-flex justify-content-center align-items-center'>
                <img src={image.url} height={200} width={300} className="m-2" />
            </div>

            ) : uploading ? (
                <div className='d-flex justify-content-center align-items-center mt-2 mb-2'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <></>
            )}


            <ReactQuill className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{ width: "770px" }} value={content} onChange={(e) => { setContent(e) }} />
            <div className='d-flex justify-content-between'>
                <label htmlFor='image' className='ms-4 mt-2'>
                    <IoMdCamera size={30} style={{ cursor: 'pointer' }} />
                    <input accept="images/*" type='file' name="image" id="image" hidden onChange={handleImage} />
                </label>
                <button className='btn btn-primary m-2' style={{ width: '150px' }} type="submit" disabled={!content} onClick={handlePostSubmit}>Post</button>
            </div>





        </div>

    )
}



export default CreatePost;