import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Permission from "../models/permission.model";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const permissions = await Permission.findAll({
        where: { id_user: decoded.id },
      });

      if (permissions.length > 0) {
        req.auth = await User.findOne({
          where: { id: decoded.id },
          include: { model: Permission, required: true },
        });

        req.auth.set("password", undefined, { strict: false });
      } else {
        req.auth = await User.findOne({
          where: { id: decoded.id },
        });

        req.auth.set("password", undefined, { strict: false });
      }

      return next();
    } catch (error) {
      console.log(error);
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
