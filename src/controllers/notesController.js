import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const filter = {};
  if (tag) {
    filter.tag = tag;
  }
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  const notes = await Note.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const { title, content, tag } = req.body;
  const newNote = await Note.create({ title, content, tag });
  res.status(201).json(newNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updates = req.body;
  const updatedNote = await Note.findByIdAndUpdate(noteId, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(updatedNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findByIdAndDelete(noteId);
  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(204).send();
};
