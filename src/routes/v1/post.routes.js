import express from "express";
import { validatorCreatePost } from "../../validators/post.validator";
import checkAuth from "../../middlewares/checkAuth";
import { createPost, getAllPosts } from "../../controllers/post.controller";
const router = express.Router();

// Create post
router
  .route("/")
  .post(validatorCreatePost, checkAuth, createPost)
  .get(getAllPosts);

export default router;
