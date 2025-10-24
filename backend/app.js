import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/project.routes.js";
import cors from "cors";
const app = express();

connect();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
