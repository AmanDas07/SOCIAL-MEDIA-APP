import React, { useEffect, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false
})

const PostComment = ({ handleCommentSubmit }) => {
    const [content, setContent] = useState();


    return (
        <>
            <ReactQuill className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{ width: "820px", marginLeft: "42px" }} value={content} onChange={(e) => { setContent(e) }} />
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary mt-2' style={{ width: '150px', marginLeft: "42px", marginBottom: "15px" }} type="submit" disabled={!content} onClick={() => { handleCommentSubmit(content) }}>Post</button>
            </div>
        </>
    )
}

export default PostComment