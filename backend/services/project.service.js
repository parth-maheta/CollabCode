import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Project name is required");
  }
  if (!userId) {
    throw new Error("User id is required");
  }
  const project = await projectModel.create({
    name,
    users: [userId],
  });
  return project;
};
export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });

  return allUserProjects;
};
export const addUserToProject = async ({ projectId, users, userId }) => {
  // Validate project ID
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project id");
  }

  // Validate users array
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("Users array is required");
  }

  // Ensure every ID inside users is valid ObjectId
  const invalidIds = users.filter((id) => !mongoose.Types.ObjectId.isValid(id));
  if (invalidIds.length > 0) {
    throw new Error(`Invalid user ids: ${invalidIds.join(", ")}`);
  }

  // Validate logged user ID
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid logged-in user id");
  }

  // Check if logged user is part of the project
  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });

  if (!project) {
    throw new Error("User is not part of this project (Unauthorized)");
  }

  // Add users to project
  const updatedProject = await projectModel.findOneAndUpdate(
    { _id: projectId },
    { $addToSet: { users: { $each: users } } },
    { new: true }
  );

  return updatedProject;
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("Invalid project id");
  }

  const project = await projectModel
    .findOne({ _id: projectId })
    .populate("users");

  return project;
};
