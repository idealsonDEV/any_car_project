require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
	}, (err) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log("Mongodb: Connexion avec succès");
		}
});

require("./models/User");
require("./models/Car");
require("./models/Comment");

const app = require("./app");

port =  process.env.PORT

app.listen(port, () => {
	console.log("Server demarer sur le port "+ port);
});