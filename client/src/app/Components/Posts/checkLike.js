import { useEffect, useState } from 'react';
import React from 'react'
import { BiLike, BiSolidLike } from "react-icons/bi";
const CheckLike = ({ post, state, unlikePost, likePost }) => {
    const [isLiked, setIsLiked] = useState();
    const [noofLikes, setnoofLikes] = useState();


    useEffect(() => {
        setIsLiked(post.likes.includes(state.user._id));
        setnoofLikes(Object.keys(post.likes).length)
    }, [])


    const handleClick = (post) => {
        setIsLiked(!isLiked);

        if (isLiked) {
            unlikePost(post._id);
            setnoofLikes((Object.keys(post.likes).length) - 1);
        } else {

            likePost(post._id);
            setnoofLikes((Object.keys(post.likes).length) + 1);
        }

    };

    return (
        <><p>{isLiked === true ? (<><BiSolidLike style={{ cursor: 'pointer' }} color='blue' size="30px" onClick={() => { handleClick(post) }} /> &nbsp; &nbsp;</>
        ) :
            (<><BiLike style={{ cursor: 'pointer' }} color='blue' size="30px" onClick={() => { handleClick(post) }} /> &nbsp; &nbsp;</>)
        }</p>
            <p className='mt-1' style={{ color: "blue", textEmphasis: 'ButtonText' }}>{noofLikes} likes&nbsp; &nbsp;</p>
        </>
    )



}

export default CheckLike