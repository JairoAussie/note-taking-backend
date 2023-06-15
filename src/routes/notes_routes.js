const express = require('express')
const notesRouter = express.Router();

notesRouter.get("/", (request, response) =>{
    response.json(
        {"message": "The list of notes goes here"}
    )
})

notesRouter.post("/", (request, response) => {
    response.json({
        "note": {
            "id": 1,
            "title": "Welcome to the note taker",
            "description": "Make your notes here",
            "isCompleted": false,
            "dueDate": new Date().setDate(new Date().getDate() + 1),
            "createdAtDate": Date.now()
        }
    })
})

module.exports = notesRouter