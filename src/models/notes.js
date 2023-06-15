const mongoose = require('mongoose')

const Note = mongoose.model('Note',{
    title: String,
    description: String,
    isCompleted: Boolean,
    dueDate: Date, 
    createdAtDate: Date
});

module.exports = Note