const mongoose = require("mongoose");
const Car = mongoose.model('Car');
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.get = async (req, res) => {
	const car = await Car.findById(req.params.id);
	if (!car) throw "Cette voiture n'est pas dans la base de donnée";

	res.send(car);
};

exports.post = async (req, res) => {
	const {mark, model , description, type} = req.body;

	const file = req.file;

	if (file.detectedFileExtension != ".jpg") throw "Votre image (JPEG) est invalide !";

	if (file.size > 1024*1024*20) throw "Votre image dépasse les 20 MO !"

	const filename = Date.now() +'_'+ file.originalName.replace(/ /g,"_");

	const carExist = await Car.findOne({mark, model , description, type});

	if (mark === "" || model === "") throw "Spécifié la mark et le model de la voiture";

	if (carExist) throw "La voiture existe déjà !";

	await pipeline (file.stream, fs.createWriteStream(`${__dirname}/../../public/images/${filename}`));

	const car = new Car({mark, model , description, type, file: filename});
	await car.save();
	res.json({
		message: "La voiture à été crée !",
	});
};

exports.getAll = async (req, res) => {
	const cars = await Car.find();
	res.send(cars)
}