import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";
export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser(req.body);
    const token = user.generateJWT();
    delete user._doc.password;
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  console.log("Login validation errors:", errors.array());
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    console.log("User from DB:", user);
    if (!user) {
      return res.status(401).json({ errors: "Invalid Credentials" });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ errors: "Invalid Credentials" });
    }
    const token = user.generateJWT();
    delete user._doc.password;
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};

export const logoutController = async (req, res) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers?.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(400).json({ message: "No token provided for logout" });
    }

    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    if (!loggedInUser) {
      return res.status(401).json({ message: "Invalid user" });
    }
    const allUsers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });
    res.status(200).json({ users: allUsers });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};
