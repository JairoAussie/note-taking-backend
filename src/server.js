const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const mongoose = require('mongoose')
const app = express();

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '127.0.0.1'

const helmet = require('helmet')
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
	directives:{
		defaultSrc:["self"]
	}
}))

app.use(express.json());

async function dbConnect(){
	try{
		await mongoose.connect('mongodb://localhost:27017/note_taking_db')
		console.log("Database connected!")
	} catch (error) {
		console.log(`dbConnect failed, error: ${JSON.stringify(error)}`)
	}
}

dbConnect()

app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the note taking backend"
	});
});

const notesRouter = require('./routes/notes_routes')
app.use("/notes", notesRouter)

const usersRouter = require('./routes/users_routes')
app.use("/users", usersRouter)

module.exports = {
	app, HOST, PORT
}