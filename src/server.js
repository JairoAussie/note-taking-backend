const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
	response.json({
		message:"Welcome to the note taking backend"
	});
});

const notesRouter = require('./routes/notes_routes')
app.use("/notes", notesRouter)

module.exports = {
	app
}