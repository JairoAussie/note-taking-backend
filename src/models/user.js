const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [{type: mongoose.Types.ObjectId, ref: 'Note'}]
})

const User = mongoose.model('User', UserSchema)

module.exports = User

/*
option1 
user{
    username, 
    password, 
    email
}
notes{
    title, 
    description, 
    ...
    username/user_id
}

option2 
user{
    username, 
    password, 
    email
    notes = [note_id, note_id, note_id]
}
notes{
    title, 
    description, 
    ...

}

*/