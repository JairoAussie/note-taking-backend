
const getNotes = (request, response) =>{
    response.json(
        {"message": "The list of notes goes here"}
    )
}

const createNote = (request, response) => {
    response.json({
        "note": {
            "id": 1,
            "title": request.body.title,
            "description": request.body.description,
            "isCompleted": false,
            "dueDate": new Date().setDate(new Date().getDate() + 1),
            "createdAtDate": Date.now()
        }
    })
}

module.exports = {getNotes, createNote}