import * as projectService from "../services/project.service.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const createProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const loggedInUser = await userModel.findOne({ email: req.user.email });
    if (!loggedInUser) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const userId = loggedInUser._id;

    const newProject = await projectService.createProject({ name, userId });

    res.status(201).json({ project: newProject });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    const allUserProjects = await projectService.getAllProjectByUserId({
      userId: loggedInUser._id,
    });

    res.status(200).json({ projects: allUserProjects });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const addUserToProjectController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, users } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;

    const updatedProject = await projectService.addUserToProject({
      projectId,
      users,
      userId,
    });

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const getProjectByIdController = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await projectService.getProjectById({ projectId });
    return res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
};
