import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/notes', celebrate(getAllNotesSchema), getNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
