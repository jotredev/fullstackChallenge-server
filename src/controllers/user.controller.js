import User from "../models/user.model";
import bcrypt from "bcrypt";

// Create user
export const createUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  // Check if user already exists
  const emailExists = await User.findOne({ where: { email: email } });

  if (emailExists) {
    return res.status(400).json({
      response: "error",
      type: "email-already-exists",
      msg: "Email already exists",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
      perm_admin: false,
    });

    const savedUser = await user.save();

    // No return password
    savedUser.password = undefined;

    res.status(201).json({
      response: "success",
      type: "user-created",
      msg: "User created",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};
