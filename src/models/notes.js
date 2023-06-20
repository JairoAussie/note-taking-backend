const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: String,
    description: String,
    isCompleted: Boolean,
    dueDate: Date, 
    createdAtDate: Date
});

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note