import express from "express";
import { login, register, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.put("/reset-password", resetPassword);

export default router;
