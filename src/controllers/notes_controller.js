const Note = require('../models/notes')

const getNotes = async (request, response) =>{

    let notes = await Note.find()
    response.send(notes)
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
    response.status(201)
    response.json({note: newNote})
}

const deleteAllNotes = async (request, response) => {
    await Note.deleteMany({})
    response.json({
        "message": "All notes deleted"
    })
}

module.exports = {getNotes, createNote, deleteAllNotes}