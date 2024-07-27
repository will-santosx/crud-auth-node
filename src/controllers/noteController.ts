import { Response } from "express";
import prisma, { _Request } from "../index";

export const createNote = async (req: _Request, res: Response) => {
  const { title, content, color } = req.body;
  const authorId = req.user as number;

  try {
    const note = await prisma.note.create({
      data: { title, content, color, authorId },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: "Failed to create note" });
  }
};

export const getNotes = async (req: _Request, res: Response) => {
  const authorId = req.user;

  try {
    const notes = await prisma.note.findMany({ where: { authorId } });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch notes" });
  }
};

export const getNoteByID = async (req: _Request, res: Response) => {
  const authorId = req.user;
  const { id } = req.params;

  try {
    const note = await prisma.note.findUnique({ where: { id: Number(id) } });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch note" });
  }
};

export const updateNote = async (req: _Request, res: Response) => {
  const { id } = req.params;
  const { title, content, color } = req.body;
  const authorId = req.user;

  try {
    const note = await prisma.note.updateMany({
      where: { id: Number(id), authorId },
      data: { title, content, color },
    });

    if (note.count === 0) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req: _Request, res: Response) => {
  const { id } = req.params;
  const authorId = req.user;

  try {
    const note = await prisma.note.deleteMany({
      where: { id: Number(id), authorId },
    });

    if (note.count === 0) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete note" });
  }
};
