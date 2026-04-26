import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

// creating JWT token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

// Register User
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // check user exists
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  //check if email already exists
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashed });
    // Create jsonwebtoken
    const token = createToken(user._id);
    // Send the response
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check user exists
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  //check if email already exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect email" });
  }

  // check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  try {
    // Create jsonwebtoken
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
