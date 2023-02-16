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
    savedUser.set("password", undefined, { strict: false });

    res.status(201).json({
      response: "success",
      type: "user-created",
      msg: "User created",
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "DESC"]] });
    res.status(201).json({
      response: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Get user
export const getUserById = async (req, res) => {
  const { id } = req.params;

  // Convert id to integer
  parseInt(id);

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(400).json({
      response: "error",
      type: "user-not-found",
      msg: "User not found",
    });
  }

  try {
    res.status(201).json({ type: "success", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password } = req.body;

  // Convert id to integer
  parseInt(id);

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(400).json({
      response: "error",
      type: "user-not-found",
      msg: "User not found",
    });
  }

  if (email) {
    // Check if user already exists
    const emailExists = await User.findOne({ where: { email: email } });

    if (emailExists) {
      return res.status(400).json({
        response: "error",
        type: "email-already-exists",
        msg: "Email already exists",
      });
    }
  }

  try {
    let hashedPassword;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.email = email?.toLowerCase() || user.email;
    user.password = hashedPassword || user.password;

    const savedUser = await user.save();

    res.status(201).json({ response: "success", user: savedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ response: "error", type: "server-error", msg: "Server error" });
  }
};
