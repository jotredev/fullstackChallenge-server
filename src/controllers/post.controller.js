import Post from "../models/post.model";
import Log from "../models/log.model";

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
    const post = new Post({
      title,
      desc,
      created_by: auth.id,
    });

    const savedPost = await post.save();

    const log = new Log({
      description: `Usuario ${auth.id} creo el post ${savedPost.id}`,
    });

    const savedLog = await log.save();

    res
      .status(201)
      .json({ response: "success", post: savedPost, log: savedLog });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};
