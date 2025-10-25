import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("name").isString().withMessage("Name is required"),
  projectController.createProjectController
);

router.get(
  "/all",
  authMiddleware.authUser,
  projectController.getAllProjectsController
);

router.put(
  "/add-user",
  authMiddleware.authUser,
  body("projectId").isString().withMessage("Project id is required"),
  body("users")
    .isArray()
    .withMessage("Users is required")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProjectController
);

router.get(
  "/get-project/:projectId",
  authMiddleware.authUser,
  projectController.getProjectByIdController
);
export default router;
