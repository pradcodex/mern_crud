import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Grab the token from headers(taking the "Bearer " space string away)
  const token = authorization.split(" ")[1];

  try {
    // Decode and extract user id from token
    const { _id } = jwt.verify(token, process.env.SECRET);
    // Save the user in request
    req.user = await User.findById(_id).select("_id");
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
export default auth;
