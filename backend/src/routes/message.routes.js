import { Router } from "express";
import {
  createMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/message.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createMessage);
router.get("/", protect, getAllMessages);
router.patch("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;
