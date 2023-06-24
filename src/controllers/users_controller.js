const User = require('../models/user')
const bcrypt = require("bcrypt")
const { createToken } = require('../services/auth_service')

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

    const token = createToken(newUser._id, newUser.username)
    response.json({
        username: newUser.username,
        token: token
    })
}

const login = async (request, response) => {
    const user = await User.findOne({username: request.body.username})

    if (user && bcrypt.compareSync(request.body.password, user.password)){
        const token = createToken(user._id, user.username)
        response.json({
            username: user.username,
            token: token
        })
    } else {
        response.json({
            error: "authentication failed"
        })
    }
}

module.exports = {signup, login}