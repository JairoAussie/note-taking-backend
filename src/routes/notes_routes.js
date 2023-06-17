const express = require('express')
const notesRouter = express.Router();
const {getNotes, getNote, createNote, deleteAllNotes, deleteNote} = require('../controllers/notes_controller')

notesRouter.get("/", getNotes)

notesRouter.get("/:id", getNote)

notesRouter.post("/", createNote)

notesRouter.delete("/clear", deleteAllNotes)

notesRouter.delete("/:id", deleteNote)
module.exports = notesRouter
