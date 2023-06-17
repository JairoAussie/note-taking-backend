const Note = require('../models/notes')

const getNotes = async (request, response) =>{

    let notes = await Note.find()
    response.send(notes)
}

const getNote = async (request, response) => {
    let note = await Note.findById(request.params.id) //params contains the key and value of the route params :id 
                        .catch(error => {  // mongoose methos can handle errors with catch
                            console.log("Some error while accessing data:\n" + error)
                            response.status(404)
                        })
    // if we could find the note we will delete it
    if (note) {
        response.json(note)
    } else { // if the id doesn't exist note will be undefined and will return error message
        response.json({error: "id not found"})
    }
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

const deleteNote = async (request, response) => {
    // find the Note by id as in getNote, with request.params.id
    // delete the note
    note = await Note.findByIdAndDelete(request.params.id)
                .catch(error => {  // mongoose methos can handle errors with catch
                    console.log("Some error while accessing data:\n" + error)
                }) 
    // if we could find the note we will delete it
    if (note) {
        response.json({message: "note deleted"})
    } else { // if the id doesn't exist note will be undefined and will return error message
        response.json({error: "id not found"})
    }
}

module.exports = {getNotes, getNote, createNote, deleteAllNotes, deleteNote}