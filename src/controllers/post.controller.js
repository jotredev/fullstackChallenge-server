import Post from "../models/post.model";
import Log from "../models/log.model";
import Review from "../models/reviews.model";
import User from "../models/user.model";

// Create post
export const createPost = async (req, res) => {
  const { auth } = req;
  const { title, desc } = req.body;

  // Verify if you have permissions
  // Permission of Create, Read, Delete posts
  const permCRDposts = auth?.permissions.some(
    (permission) => permission.name === "crd_posts"
  );

  if (!permCRDposts) {
    return res.status(403).json({
      response: "error",
      type: "not-permissions",
      msg: "Not permissions",
    });
  }

  try {
    // Create post
    const post = new Post({
      title,
      desc,
      created_by: auth.id,
    });

    // Save post
    const savedPost = await post.save();

    // Create log
    const log = new Log({
      description: `Usuario ${auth.id} creo el post ${savedPost.id}`,
    });

    // Save log
    await log.save();

    // Response
    res.status(201).json({ response: "success", post: savedPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    // Get all posts with reviews
    const posts = await Post.findAll({
      include: [
        {
          model: Review,
          attributes: ["name", "comment", "createdAt"],
        },
        { model: User, attributes: ["name", "lastname", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Response
    res.status(201).json({ response: "success", posts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Create review
export const createReview = async (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;

  // Get post by id
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({
      response: "error",
      type: "post-not-found",
      msg: "Post not found",
    });
  }

  try {
    // Create review
    const review = new Review({
      name,
      comment,
      id_post: post.id,
    });

    // Save review
    const savedReview = await review.save();

    res.status(201).json({ response: "success", review: savedReview });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Get post by id
export const getPostById = async (req, res) => {
  const { id } = req.params;

  // Get post
  const post = await Post.findOne({
    where: { id },
  });

  if (!post) {
    return res.status(404).json({
      response: "error",
      type: "post-not-found",
      msg: "Post not found",
    });
  }

  try {
    // Response
    res.status(201).json({ response: "success", post });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Update post
export const updatePost = async (req, res) => {
  const { auth } = req;
  const { id } = req.params;
  const { title, desc } = req.body;

  // Verify if you have permissions
  // Permission of update posts
  const permUpdatePosts = auth?.permissions.some(
    (permission) => permission.name === "update_posts"
  );

  if (!permUpdatePosts) {
    return res.status(403).json({
      response: "error",
      type: "not-permissions",
      msg: "Not permissions",
    });
  }

  // Get post
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({
      response: "error",
      type: "post-not-found",
      msg: "Post not found",
    });
  }

  try {
    // Verify data
    post.title = title || post.title;
    post.desc = desc || post.desc;

    // Ssave post
    const savedPost = await post.save();

    // Create log
    const log = new Log({
      description: `Usuario ${auth.id} actualiz?? el post ${savedPost.id}`,
    });

    // Save log
    await log.save();

    // Response
    res.status(201).json({ response: "success", post: savedPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { auth } = req;
  const { id } = req.params;

  // Verify if you have permissions
  // Permission of Create, Read, Delete posts
  const permCRDposts = auth?.permissions.some(
    (permission) => permission.name === "crd_posts"
  );

  if (!permCRDposts) {
    return res.status(403).json({
      response: "error",
      type: "not-permissions",
      msg: "Not permissions",
    });
  }

  // Get post
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({
      response: "error",
      type: "post-not-found",
      msg: "Post not found",
    });
  }

  try {
    // Delete post
    await Post.destroy({ where: { id } });

    // Create log
    const log = new Log({
      description: `Usuario ${auth.id} elimin?? el post ${post.id}`,
    });

    // Save log
    await log.save();

    // Response
    res.status(201).json({ response: "success", msg: "Deleted post" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Get all logs
export const getAllLogs = async (req, res) => {
  const { auth } = req;

  // Verify is admin
  const isAdmin = auth?.permissions.some(
    (permission) => permission.name === "admin"
  );

  if (!isAdmin) {
    return res.status(403).json({
      response: "error",
      type: "not-admin",
      msg: "Not admin",
    });
  }

  try {
    // Get all logs with
    const logs = await Log.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Response
    res.status(201).json({ response: "success", logs });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};
