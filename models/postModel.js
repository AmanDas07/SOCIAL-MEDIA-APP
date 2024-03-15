import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    image: {
        url: String,
        public_id: String,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "users",
        },
    ],
    comment: [
        {
            text: {
                type: String,
                required: true,
                trim: true
            },

            created: {
                type: Date,
                default: Date.now,
            },
            postedBy: {
                type: mongoose.Schema.ObjectId,
                ref: "users",
            },
        },
    ],
},
    { timestamps: true })

export default mongoose.model("Post", postSchema);