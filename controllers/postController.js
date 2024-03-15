import postModel from "../models/postModel.js"
import cloudinary from "cloudinary";
import userModel from "../models/userModel.js";

//configure
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPostController = (req, res) => {
    const { content, image } = req.body;
    if (!content) {
        return res.status(400).send("Content is Required");
    }
    try {
        const post = new postModel({ content, image, postedBy: req.auth._id });
        post.save();
        res.status(201).send(post);
    }

    catch (error) {
        console.log(error);
        return res.status(400).send("Error, Please Try Again!");
    }
}

export const imageUploadController = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.log(error);
    }

}

export const userPostController = async (req, res) => {
    try {
        const posts = await postModel.find({})
            //find({ postedBy: req.auth._id })
            .populate("postedBy", "_id name image")
            .sort({ createdAt: -1 })
            .limit(10)
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const userPostEditController = async (req, res) => {

    try {
        const _id = req.params._id;
        const edit = await postModel.find({ _id });
        res.json(edit);
    } catch (error) {
        console.log(error);
    }
}

export const userPostUpdateController = async (req, res) => {
    try {
        const update = await postModel.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        });
        res.status(201).json(update);
    } catch (error) {
        console.log(error);
    }
}

export const postDeleteController = async (req, res) => {
    try {
        const post = await postModel.findByIdAndDelete(req.params._id);
        if (post.image && post.image.public_id) {
            const image = cloudinary.uploader.destroy(post.image.public_id);
        }
        res.status(200).json({
            ok: true,
        })
    } catch (error) {
        console.log(error);

    }
}

export const likeController = async (req, res) => {
    try {
        const likedBy = await postModel.findById(req.body.post_id);
        if (likedBy.likes.includes(req.auth._id)) {
            return res.status(400).json("Already Liked this Post");
        }
        likedBy.likes.push(req.auth._id);
        likedBy.save();
        console.log("Liked Successfully");
        return res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error");
    }
}

export const unlikeController = async (req, res) => {
    try {
        const unlikedBy = await postModel.findById(req.params._id);

        const index = unlikedBy.likes.indexOf(req.auth._id);
        if (index !== -1) {
            unlikedBy.likes.splice(index, 1);
            await unlikedBy.save();
            console.log("UnLiked Successfully");
            return res.status(200).json("Unliked this post");
        }
        if (index === -1) {
            return res.status(400).json("You haven't liked this post yet.");
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error");

    }
}


export const getCommentsController = async (req, res) => {

    try {
        const post = await postModel.findById(req.params._id);
        const data = {
            comment: post.comment,
            post: post
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }

}

export const postCommentsController = async (req, res) => {
    try {
        const comment = req.body.comment;
        const _id = req.body._id;


        await postModel.findOneAndUpdate(
            { _id },
            {
                $push: {
                    comment: { text: comment, postedBy: req.auth._id }
                }
            }
        )
        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
}

export const deleteCommentsController = async (req, res) => {

    try {

        const _id = req.body.post._id
        const commentId = req.body.comment._id;
        await postModel.findOneAndUpdate(
            { _id },
            {
                $pull: {
                    comment: {
                        _id: commentId,
                    }
                }
            }
        )
        return res.status(200).json({ delete: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error");
    }

}