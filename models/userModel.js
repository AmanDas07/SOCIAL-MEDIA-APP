import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema({
    name: {
        type: String,
        trim: true,
        required: true

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: 8,
        max: 45,
    },
    answer: {
        type: String,
        trim: true,

    },
    username: {
        type: String,

        unique: true,
    },
    answerNumber: {
        type: String,
    },

    about: {},

    image: {
        url: String,
        public_id: String,
    },
    following: [{
        type: Schema.ObjectId,
        ref: 'User',
    }],
    followers: [{
        type: Schema.ObjectId,
        ref: 'User',
    }]


}, { timestamps: true });

export default mongoose.model('users', userModel);