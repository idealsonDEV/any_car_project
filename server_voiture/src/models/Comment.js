const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user: {type:mongoose.Schema.Types.ObjectId, require:true, ref:"User"},
	username: {type:String, require:true},
	car: {type:mongoose.Schema.Types.ObjectId, require:true, ref:"Car"},
	message: {type:String, require:true},
}, {
	timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);
