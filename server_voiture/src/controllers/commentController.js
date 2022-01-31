const mongoose = require("mongoose");
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const Car = mongoose.model('Car');

exports.get = async (req, res) => {
	const car_id = req.params.id;
	const comments = await Comment.find({car: car_id}).sort({createdAt: -1});
	res.send(comments);
};

exports.post = async (req, res) => {
	const {message} = req.body;
	const user = await User.findOne({_id:req.payload.id});
	if (!user) throw "Utilisateur non enregistré";
	const car = await Car.findOne({_id:req.params.id});
	if (!car) throw "Voiture non enregistré";
	const comment = new Comment({user: req.payload.id, username:user.name, car: req.params.id, message});
	await comment.save();
	res.json({
		message: "Commentaire enregistré !"
	});
};
