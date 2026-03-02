import express from "express";
import {register,login,getProfile,updateProfile,changePassword} from "../controllers/authController.js"

const router = express.Router();

router.post("/register",register);

router.post("/login",login);

router.get("/profile",getProfile);

router.put("/profile",updateProfile);

router.post("/change-password",changePassword)

export default router;