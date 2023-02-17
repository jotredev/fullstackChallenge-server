import express from "express";
import {
  validatorCreatePost,
  validatorCreateReview,
  validatorGetPost,
} from "../../validators/post.validator";
import checkAuth from "../../middlewares/checkAuth";
import {
  createPost,
  createReview,
  getAllPosts,
  getPostById,
} from "../../controllers/post.controller";
const router = express.Router();

// Create post, get all posts
router
  .route("/")
  .post(validatorCreatePost, checkAuth, createPost)
  .get(getAllPosts);

// Create review
router.post("/reviews/:id", validatorCreateReview, createReview);

// Get post
router.get("/:id", validatorGetPost, getPostById);

export default router;
