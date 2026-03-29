import { Router } from "express";
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllSkills);
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
