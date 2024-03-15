'use client'
import React, { useContext, useEffect, useState } from 'react'
import moment from "moment";
import PostImage from './PostImage';
import { FaRegEdit, FaTrashAlt, FaComment } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { userContext } from '../../../../context/page';
import CheckLike from './checkLike';
//import renderHTML from "react-render-html/index";
const PostLists = ({ posts, deletePost, likePost, unlikePost }) => {
    const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const router = useRouter();
    const [state] = useContext(userContext);

    return (
        <>
            {posts &&
                posts.map((post) => (
                    <div key={post._id}>
                        <div className='w-100'>
                            <div className="card m-5 ">
                                <div className="card-header">
                                    <div>
                                        <img
                                            src={defaultImage}
                                            alt="userpic"
                                            height={30}
                                            width={30}
                                        />
                                        <span className="ms-2">{post.postedBy.name}</span>
                                        <span className="ms-3">
                                            {moment(post.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
                                    <PostImage url={post.image && post.image.url} postedBy={post.postedBy.name} />
                                </div>
                                <div className="card-footer">
                                    <div className='d-flex flex-row m-2'>
                                        <CheckLike post={post} state={state} unlikePost={unlikePost} likePost={likePost} />
                                        <FaComment style={{ cursor: 'pointer' }} size="30px" onClick={() => { router.push(`Dashboard/comments/${post._id}`) }} />&nbsp;&nbsp;

                                        {state && state.user && state.user._id === post.postedBy._id && (
                                            <div className='ms-4'>
                                                <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => { router.push(`Dashboard/${post._id}`) }} size={25} /> &nbsp; &nbsp;

                                                <FaTrashAlt style={{ cursor: 'pointer' }} color='red' size={25} onClick={() => { deletePost(post) }} />
                                            </div>
                                        )}

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                ))}
        </>
    );
}

export default PostLists;