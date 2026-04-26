import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

// Register a new user
router.post("/", registerUser);

// Login a user
router.post("/login", loginUser);

export { router as usersRoutes };