import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { postRoutes } from "./routes/postRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

mongoose
.connect(process.env.MONGO_URL, { dbName: "demo_db" })
   .then(() => {
     console.log("Connected to DB");
     app.listen(3000, () => {
     console.log("Server running on port 3000");
     });
   })
   .catch((err) => console.log(err));