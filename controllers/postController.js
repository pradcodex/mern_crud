import mongoose from "mongoose";
import Post from "../models/PostModel.js";

// get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create new post

const addPost = async (req, res) => {
  // Grab data from request body
  const { title, body } = req.body;

  // Check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const post = await Post.create({ title, body });

    res.status(200).json({ success: "Post created", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete post

const deletePost = async (req, res) => {
  // check if ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check the posts exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ success: "Post was deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update posts
const updatePost = async (req, res) => {
  // Grab the data from request data
  const { title, body } = req.body;

  // check if ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // check the posts exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // Check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ success: "Post was updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, addPost, deletePost, updatePost };
