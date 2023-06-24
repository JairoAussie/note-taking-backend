const Note = require('../models/notes')
const User = require('../models/user')

const getNotes = async (request, response) =>{
    // request.query contains the string query url -> ?isComplete=true 
    // it is printed as an object
    let notes
    //Check if request.query is not empty, if it has at least one key
    if (Object.keys(request.query).length > 0) {
        //specific search of the query string key and value, 
        // 'true' and 'false' are received as strings instead of booleans
        if (request.query.isCompleted === "true")
            notes = await Note.find({isCompleted: true})
        else if (request.query.isCompleted === "false")
            notes = await Note.find({isCompleted: false})
        //if the query string doesn't match with our searching criteria return all the list
        else{
            notes = await Note.find()
        }
    //if there's not a query string return all the list
    } else {
        notes = await Note.find()
    }
    response.send(notes)
    
}

const getMyNotes = async (request, response) => {
    //find user by username, once we have auth, this can be taken from the token
    let user = await User.findOne({username: request.body.username}).populate('notes')
    response.send(user.notes)
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
    // let user = await User.findOne({username: request.user.username})
    // findById should be better
    let user = await User.findById(request.user.user_id)

    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: request.body.isCompleted,
        dueDate: request.body.dueDate,
        createdAtDate: Date.now()
    })
    await newNote.save()
    user.notes.push(newNote._id)
    await user.save() 
    response.status(201)
    response.json(newNote)
}

const updateNote = async (request, response) => {
    //find the Note with request.params.id
    //update the note with the data received in request.body
    // save the changes in the db
    // set new: true to receive the updated note
    let updatedNote = await Note.findByIdAndUpdate(request.params.id, request.body, {new: true})
                                .catch(error => {  // mongoose methos can handle errors with catch
                                    console.log("Some error while accessing data:\n" + error)
                                }) 
    // if we could find the note we will update it
    if (updatedNote) {
        response.send(updatedNote)
    } else { // if the id doesn't exist note will be undefined and will return error message
        response.json({error: "id not found"})
    }     
}

const deleteAllNotes = async (request, response) => {
    await Note.deleteMany({})
    response.json({
        "message": "All notes deleted"
    })
}

const deleteNote = async (request, response) => {
    let user = await User.findOne({username: request.body.username})
    // find the Note by id as in getNote, with request.params.id
    // delete the note
    note = await Note.findByIdAndDelete(request.params.id)
                .catch(error => {  // mongoose methos can handle errors with catch
                    console.log("Some error while accessing data:\n" + error)
                }) 
    // if we could find the note we will delete it
    if (note) {
        //remove the note_id from the user's notes array
        user.notes.shift(note._id);
        response.json({message: "note deleted"})
    } else { // if the id doesn't exist note will be undefined and will return error message
        response.json({error: "id not found"})
    }
}

module.exports = {getNotes, getMyNotes, getNote, createNote, updateNote, deleteAllNotes, deleteNote}
