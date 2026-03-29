import { Router } from "express";
import {
  getProfile,
  upsertProfile,
} from "../controllers/profile.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProfile);
router.put("/", protect, upsertProfile);

export default router;
