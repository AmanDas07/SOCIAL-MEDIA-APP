import express from "express";
import { requireSignin, canEditDeletePost } from "../middlewares/page.js"
import { createPostController, imageUploadController, userPostController, userPostEditController, userPostUpdateController, postDeleteController, likeController, unlikeController, getCommentsController, postCommentsController, deleteCommentsController } from "../controllers/postController.js";
import formidableMiddleware from "express-formidable";
const router = express.Router();


router.post("/createpost", requireSignin, createPostController);

router.post("/upload-image", requireSignin, formidableMiddleware(), imageUploadController)

router.get("/user-posts", requireSignin, userPostController);

router.get("/user-posts/:_id", requireSignin, userPostEditController);

router.put("/user-posts/:_id", requireSignin, canEditDeletePost, userPostUpdateController);

router.delete("/delete-post/:_id", requireSignin, canEditDeletePost, postDeleteController)

router.put("/like-post", requireSignin, likeController);

router.delete("/unlike-post/:_id", requireSignin, unlikeController);

router.get("/get-comments/:_id", requireSignin, getCommentsController)

router.post("/post-comments", requireSignin, postCommentsController)

router.put("/delete-comment", requireSignin, deleteCommentsController)

export default router;