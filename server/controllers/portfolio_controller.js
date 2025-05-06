import { gen_jwt } from "../middlewares/jwt.js";
import { Message, User } from "../models/portfolio_models.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Recieve Email messages
export const recieve_message = async (req, res) => {
  const { username, email, message } = req.body;
  try {
    if (!email || !username || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all the required detail." });
    }
    const msg = new Message({
      username,
      email,
      message,
    });
    const data = await msg.save();
    res.status(200).json({ success: true, message: "Message sent.", data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Approve users to dashboard
export const add_admin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Please provide the required details!",
      });
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        message: "The user provided is already approved!",
      });
    const hashed_password = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashed_password });
    await newUser.save();
    const users = await User.find().select("-password");
    res.status(201).json({
      success: true,
      message: `User with ${email} is now approved!`,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Approved login
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Please provide the required details!",
      });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Not yet approved by admin!",
      });
    const hashed_password = await bcrypt.compare(password, user.password);
    if (!hashed_password)
      return res.status(400).json({
        success: false,
        message: "Invalid password please try again!",
      });
    gen_jwt(res, user._id);
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: `Authentication success!`, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// checkAuth

export const check_auth = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await User.findById(user_id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, message: "Connected!", users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ success: true, message: "Logged out!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const remove_admin = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "No ID provided!" });
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user with id found!" });
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: "User removed successfully!", users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
