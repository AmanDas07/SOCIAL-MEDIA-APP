

import userModel from "../models/userModel.js"
import { comparePassword, hashed } from "../utils/helpers.js";
import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import jwt from "jsonwebtoken";
import postModel from "../models/postModel.js";

export const registerController = async (request, response) => {

    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const answer = request.body.answer;
    const answerNumber = request.body.answernum;
    //const [error, setError] = useState("");
    if (!name) {
        // console.log("REQUEST.BODY" + request.body);
        return response.status(400).send('Name is required');
    }
    if (!password) {
        return response.status(400).send('Password is required');
    }
    if (!answer) {
        return response.status(400).send('Answer is required');

    }



    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
        return response.status(400).send('Invalid Email');

    }

    if (password.length < 8) {
        return response.status(400).send("Password too short");
    }

    //Hashed password


    try {

        const save = async () => {
            const exist = await userModel.findOne({ email: email }).exec();
            if (exist) {
                // console.log(exist.email);
                return response.status(400).send('Email already exists');

            }
            else {
                //username: nanoid(7),
                //console.log(exist.email);
                const hashedPassword = await hashed(password);
                const user = new userModel({ name, email, password: hashedPassword, answer, answerNumber });
                await user.save().then(() => { return response.status(200).send('User Registered') });
            }

        }
        save();

    } catch (error) {
        console.log(error);
    }


}


export const loginController = async (request, response) => {

    const email = request.body.email;
    const password = request.body.password;

    try {

        const verify = async () => {
            const user = await userModel.findOne({ email: email });

            if (!user) { return response.status(400).send("Invalid User") };
            const match = await comparePassword(password, user.password);
            if (!match) { return response.status(400).send("Invalid Password") };

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            user.password = undefined;
            user.answer = undefined;
            response.status(200).json({
                token,
                user,
            });
        }

        verify();
    }
    catch (error) {
        console.log(error);
        return res.status(400).send("Error, Try Again");
    }




}


export const currentUserController = async (req, res) => {

    // console.log(req.auth);
    try {
        const find = async () => {
            const user = await userModel.findById(req.auth._id)
            return res.status(200).json({ ok: true });
        }
        find();
    }
    catch (error) {
        return res.status(400).json(error);
    }
}



export const passwordResetController = async (request, response) => {

    const email = request.body.email;
    const password = request.body.password;
    const answer = request.body.answer;
    const answerNumber = request.body.answernum;
    const newPassword = request.body.newPassword;
    //const [error, setError] = useState("");
    if (!password) {
        return response.status(400).send('Password is Required');
    }
    if (!answer) {
        return response.status(400).send('Answer is Required');

    }


    try {
        const reset = async () => {
            // console.log("ghusaa");
            const exist = await userModel.findOne({ email: email }).exec();
            const match = await comparePassword(password, exist.password);
            const hashednewPassword = await hashed(newPassword);
            console.log(answerNumber);
            if (!match) {
                return response.status(400).send('Something Went Wrong');
            }
            if (exist.answerNumber != answerNumber) {
                return response.status(400).send('Incorrect Answer');
            }
            if (exist.answer != answer) {
                return response.status(400).send('Incorrect Answer');
            }

            console.log("ghusaa");
            const user = await userModel.findByIdAndUpdate(exist._id, { password: hashednewPassword });
            return response.status(201).send("Password Reset success");




        }
        reset();

    } catch (error) {
        console.log(error);
        return res.status(400).send("Somthing Went Wrong");
    }

}

export const updateProfileController = async (req, res) => {
    // console.log(req.body);
    try {
        const data = {};
        if (req.body.username) {
            data.username = req.body.username;
        }
        if (req.body.image) {
            data.image = req.body.image;
        }
        if (req.body.about) {
            data.about = req.body.about;
        }
        if (req.body.name) {
            data.name = req.body.name;
        }
        if (req.body.password) {
            if (req.body.password < 6) {
                return res.status(502).json({
                    error: "Password Required and should be longer than 6 character",
                });
            } else {
                console.log(req.body.password);
                data.password = await hashed(req.body.password);
            }
        }
        let user = await userModel.findByIdAndUpdate(req.auth._id, data, {
            new: true,
        });
        user.password = null;
        user.answer = null;
        res.status(200).json(user);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: "Duplicate UserName Error",
            });
        }
        console.log(err);
    }
};

export const findPeopleController = async (req, res) => {
    try {
        const user = await userModel.findById(req.auth._id);

        let following = user.following;
        following.push(user._id);
        const people = (await userModel.find({ _id: { $nin: following } }).select("-password -answer -answerNumber").limit(6));
        res.json(people);
    } catch (error) {
        console.log(error);
    }

}

export const addfollowingController = async (req, res) => {

    const user = req.body.user;
    try {
        const follow = await userModel.findById(req.auth._id);
        const isFollowing = follow.following.some(followingUserId => followingUserId.toString() === user._id.toString());

        if (isFollowing) {
            console.log('User is already following');
            return res.status(400).json("Error");
        }
        else {
            follow.following.push(user._id);
            follow.save();

            followingtoController(req, res, user, req.auth._id);
            return res.status(200).json("Followed");
        }


    } catch (error) {
        console.log(error);
        return res.status(400).json("Error");
    }

}

const followingtoController = async (req, res, user, _id) => {
    try {
        const followingTo = await userModel.findById(user._id);
        const isFollowing = followingTo.followers.some(followerUserId => followerUserId.toString() === _id);

        if (isFollowing) {
            console.log('User is already following');
            return res.status(400).json("Error");
        }
        else {
            followingTo.followers.push(_id);
            followingTo.save();
            console.log(followingTo);
        }
    } catch (error) {
        console.log(error);
    }


}

