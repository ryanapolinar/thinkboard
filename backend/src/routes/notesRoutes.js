import express from "express"
import { getAllNotes, createNote, deleteNote, updateNote, getNoteById } from "../controllers/notesController.js"

const router = express.Router();

// Note Router requests
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;