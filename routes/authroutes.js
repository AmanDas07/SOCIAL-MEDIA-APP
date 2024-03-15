import express from "express";
import { registerController, loginController, currentUserController, passwordResetController, updateProfileController, findPeopleController, addfollowingController } from "../controllers/authController.js";
import { requireSignin } from "../middlewares/page.js"
const router = express.Router();


router.post("/Register", registerController);

router.post("/Login", loginController);

router.get("/currentuser", requireSignin, currentUserController)

router.post("/forgotPassword", passwordResetController)

router.put("/profile-update", requireSignin, updateProfileController);

router.get("/find-people", requireSignin, findPeopleController);

router.post("/add-following", requireSignin, addfollowingController);



export default router;