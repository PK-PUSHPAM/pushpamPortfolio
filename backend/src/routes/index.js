import { Router } from "express";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";
import skillRoutes from "./skill.routes.js";
import profileRoutes from "./profile.routes.js";
import messageRoutes from "./message.routes.js";
import socialLinkRoutes from "./socialLink.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/profile", profileRoutes);
router.use("/messages", messageRoutes);
router.use("/social-links", socialLinkRoutes);

export default router;
