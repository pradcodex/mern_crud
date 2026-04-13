import express from "express";
import Post from "../models/PostModel.js";
import { addPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

// Get all posts route
router.get("/", getPosts);

// Create new post route
router.post("/", addPost);

export { router as postRoutes };
