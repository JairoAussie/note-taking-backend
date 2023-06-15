const express = require('express')
const notesRouter = express.Router();
const {getNotes, createNote, deleteAllNotes} = require('../controllers/notes_controller')

notesRouter.get("/", getNotes)

notesRouter.post("/", createNote)

notesRouter.delete("/clear", deleteAllNotes)

module.exports = notesRouter