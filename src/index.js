const {app, HOST, PORT} = require('./server');

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
