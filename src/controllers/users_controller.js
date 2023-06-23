const User = require('../models/user')
const bcrypt = require("bcrypt")

const signup = async (request, response) => {
    
    let newUser = new User({
        username: request.body.username,
        password: bcrypt.hashSync(
            request.body.password,
            bcrypt.genSaltSync(10)
        ),
        notes: []
    })

    await newUser.save()
                .catch(error =>{
                    console.log(error.errors)
            })

    response.send(newUser)
}

module.exports = {signup}