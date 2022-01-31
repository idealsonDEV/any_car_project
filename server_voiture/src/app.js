const express = require("express");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use(require("./routes/user"));
app.use(require("./routes/car"));
app.use(require("./routes/comment"));


// errorhandlers
const errorHandlers = require('./handlers/errorhandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
	app.use(errorHandlers.developmentErrors);
} else {
	app.use(errorHandlers.productionErrors);
}


module.exports = app;

