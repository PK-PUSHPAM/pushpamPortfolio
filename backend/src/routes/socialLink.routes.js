import { Router } from "express";
import {
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../controllers/socialLink.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllSocialLinks);
router.post("/", protect, createSocialLink);
router.put("/:id", protect, updateSocialLink);
router.delete("/:id", protect, deleteSocialLink);

export default router;
