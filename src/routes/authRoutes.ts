import express from "express";
import { register, login, getUserInfo } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getUserInfo);

export default router;
