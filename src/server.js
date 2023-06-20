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

const cors = require('cors')
let corsOptions = {
	origin: ["http://localhost:3000"],
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

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

app.get('*', (request, response) =>{
	response.status(404)
	response.json({
		message: "Route not found",
		path: request.path
	})
})

module.exports = {
	app, HOST, PORT
}