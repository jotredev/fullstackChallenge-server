import express from "express";
import { validatorCreatePost } from "../../validators/post.validator";
import checkAuth from "../../middlewares/checkAuth";
import { createPost } from "../../controllers/post.controller";
const router = express.Router();

// Create post
router.route("/").post(validatorCreatePost, checkAuth, createPost);

export default router;
