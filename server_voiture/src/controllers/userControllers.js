const mongoose = require("mongoose");
const User = mongoose.model('User');
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
	const {name, email, password} = req.body;

	const emailRegex = /[a-z0-9\s]+@[a-z0-9]+\.[a-z]/;

	if (!emailRegex.test(email)) throw "Email non valide";

	if (password.length < 6) throw "Le mot de passe est inferieur à 6 caractère";

	const userExist = await User.findOne({
		email,
	})

	if (userExist) throw "L'adresse email existe déjà !";

	const user = new User({
		name,
		email,
		password: sha256(password + process.env.SALT),
	});

	await user.save();

	res.json({
		success: true,
		message: "Utilisatuer enregistrer"
	});
};

exports.login = async (req, res) => {
	const {email, password} = req.body;
	const user = await User.findOne({
		email,
		password: sha256(password + process.env.SALT),
	});

	if (!user) throw "L'addresse email ou le mot de passe sont incorrecte !";
	const token = await jwt.sign({id: user.id}, process.env.SECRET);

	res.json({
		message: "Utilisateur connecté avec succes",
		user_id: user._id,
		user_name: user.name,
		token,
	});
}