import jwt from "jsonwebtoken";
import User from "../models/user.model";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne(decoded.id);

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ response: "error", msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ response: "error", msg: "Not authorized, no token" });
  }

  next();
};

export default checkAuth;
