import React from 'react'

const PostImage = ({ url, postedBy }) => {
    return (
        <div>

            <div className='d-flex justify-content-center align-items-center' >
                {url && (<img
                    className='rounded-circle'
                    src={url}
                    alt='post-image'
                    height={300}
                    margin={5}

                />)}

            </div>

        </div>
    )
}

export default PostImage