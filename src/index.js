const {app, PORT} = require('./server');

app.listen(PORT, () => {
	console.log("Express server is running on port " + PORT);
});
