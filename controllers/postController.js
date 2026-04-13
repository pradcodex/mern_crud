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

export { getPosts, addPost };
