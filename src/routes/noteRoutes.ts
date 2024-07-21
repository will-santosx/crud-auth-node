import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;
