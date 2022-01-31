const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
	mark: {type:String, require:true},
	model: {type:String, require:true},
	description: {type:String, require:true},
	type: {type:String, require:true},
	file: {type:String, require:true}
}, {
	timestamps: true,
});

module.exports = mongoose.model("Car", carSchema);