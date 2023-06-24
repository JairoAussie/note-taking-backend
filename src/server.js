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
	origin: ["http://localhost:3000", "https://bespoke-klepon-bc5d33.netlify.app"],
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

let databaseURL = "";
switch(process.env.NODE_ENV.toLowerCase()){
	case "production":
		databaseURL = process.env.DATABASE_URL;
		break;
	case "development":
		databaseURL = 'mongodb://localhost:27017/note_taking_db';
		break;
	case "test":
		databaseURL = 'mongodb://localhost:27017/note_taking_db_test';
		break;
	default:
		console.error("Wrong environment mode, database cannot connect");
}

const {databaseConnector} = require("./database")
databaseConnector(databaseURL).then(() =>{
	console.log("connected to the db!")
}).catch(error => {
	console.log("could not connect to the db!")
	console.log(error)
})

app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});

app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the note taking backend"
	});
});

const usersRouter = require('./routes/users_routes')
app.use("/users", usersRouter)

// add a middleware that validates user authentication for all notes routes
const validateRequest = require('./middlewares/auth_middleware');
app.use(validateRequest)

const notesRouter = require('./routes/notes_routes');

app.use("/notes", notesRouter)



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
