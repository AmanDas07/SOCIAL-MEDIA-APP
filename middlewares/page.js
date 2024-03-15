import { expressjwt } from "express-jwt";
import postModel from "../models/postModel.js";


export const requireSignin = expressjwt({
    secret: "AYRTEFJKLHSVCFSNMPOINLKLKKL",
    algorithms: ['HS256'],
})

export const canEditDeletePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params._id);
        if (req.auth._id != post.postedBy) {
            return req.status(402).send("Unauthorized");
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}