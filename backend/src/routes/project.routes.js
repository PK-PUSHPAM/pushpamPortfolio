import { Router } from "express";
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
