const express = require('express')
const {signup} = require('../controllers/users_controller')
const usersRouter = express.Router();

usersRouter.post("/signup", signup)

module.exports = usersRouter