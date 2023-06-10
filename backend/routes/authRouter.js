import { Router } from "express";
const router = Router();

import dotenv from "dotenv";
dotenv.config();

import {
  register,
  login,
//   getCurrentUser,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
// router.get("/user", getCurrentUser);

export default router;

