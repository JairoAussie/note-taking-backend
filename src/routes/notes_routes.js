const express = require('express')
const notesRouter = express.Router();
const {getNotes, getMyNotes, getNote, createNote, updateNote, deleteAllNotes, deleteNote} = require('../controllers/notes_controller')

notesRouter.get("/", getNotes)

notesRouter.get("/my_notes", getMyNotes)

notesRouter.get("/:id", getNote)

notesRouter.post("/", createNote)

notesRouter.put("/:id", updateNote)

notesRouter.delete("/clear", deleteAllNotes)

notesRouter.delete("/:id", deleteNote)
module.exports = notesRouter
