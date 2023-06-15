const Note = require('../models/notes')

const getNotes = (request, response) =>{
    response.json(
        {"message": "The list of notes goes here"}
    )
}

const createNote = async (request, response) => {
    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1),
        createdAtDate: Date.now()
    })
    await newNote.save()
    response.json({
        note: newNote
    })
}

module.exports = {getNotes, createNote}