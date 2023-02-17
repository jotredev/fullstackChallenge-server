import express from "express";
import {
  validatorCreatePost,
  validatorCreateReview,
  validatorGetPost,
  validatorUpdatePost,
} from "../../validators/post.validator";
import checkAuth from "../../middlewares/checkAuth";
import {
  createPost,
  createReview,
  getAllPosts,
  getPostById,
  updatePost,
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
router
  .route("/:id")
  .get(validatorGetPost, getPostById)
  .put(validatorUpdatePost, checkAuth, updatePost);

export default router;
