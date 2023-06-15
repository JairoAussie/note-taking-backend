const express = require('express')
const notesRouter = express.Router();
const {getNotes, createNote} = require('../controllers/notes_controller')

notesRouter.get("/", getNotes)

notesRouter.post("/", createNote)

module.exports = notesRouter