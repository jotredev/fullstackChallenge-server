import express from "express";
import {
  validatorCreatePost,
  validatorCreateReview,
  validatorId,
} from "../../validators/post.validator";
import checkAuth from "../../middlewares/checkAuth";
import {
  createPost,
  createReview,
  deletePost,
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
  .get(validatorId, getPostById)
  .put(validatorId, checkAuth, updatePost)
  .delete(validatorId, checkAuth, deletePost);

export default router;
