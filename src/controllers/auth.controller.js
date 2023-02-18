import User from "../models/user.model";
import bcrypt from "bcrypt";
import generateJWT from "../helpers/generateJWT";

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email.toLowerCase() } });

  // Verify if the user exists
  if (!user) {
    return res.status(404).json({
      response: "error",
      msg: "User or password incorrect",
      type: "user-or-password-incorrect",
    });
  }

  // Verify if the password is correct
  const compare = await bcrypt.compare(password, user.password);

  if (!compare) {
    return res.status(401).json({
      response: "error",
      msg: "User or password incorrect",
      type: "user-or-password-incorrect",
    });
  }

  try {
    // Generate jsonwebtoken
    const token = await generateJWT(user.id);
    // No return password
    user.set("password", undefined, { strict: false });
    // Response
    res.status(201).json({ response: "success", user, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ response: "error", msg: "Server error", type: "server-error" });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  const { auth } = req;
  return res.status(201).json(auth);
};
