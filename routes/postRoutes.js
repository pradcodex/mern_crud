import express from "express";
import Post from "../models/PostModel.js";
import {
  addPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
// route -> http methods + url path ('/') + controller/handler function (getPosts)
// HTTP Methods CRUD
// Get all posts route
router.get("/", getPosts); // GET

// Create new post route
router.post("/", auth, addPost); //POST

//Delete posts
router.delete("/:id",auth, deletePost); //DELETE

// Update post route
router.put("/:id",auth, updatePost); // PUT

export { router as postRoutes };
