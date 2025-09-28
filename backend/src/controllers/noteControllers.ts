import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get user notes
// @route   GET /api/notes
export const getNotes = async (req: AuthRequest, res: Response) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }
  const note = new Note({
    user: req.user._id,
    content,
  });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req: AuthRequest, res: Response) => {
  const note = await Note.findById(req.params.id);
  if (note && note.user.toString() === req.user._id.toString()) {
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404).json({ message: 'Note not found or user not authorized' });
  }
};