const moment = require('moment');
const Films = require('../../models/Films.model.js');
const Manufacturers = require('../../models/Manufacturer.model');

module.exports.getFilms = async (req, res) => {
	const films = await Films.find();
	res.json(films);
};

module.exports.getFilm = async (req, res) => {
	const { id } = req.params;
	try {
		const film = await Films.findById(id);
		if (!film) {
			res.status(404);
			return res.send({
				err: 'This Film Does Not Exist',
			});
		} else {
			res.status(200);
			return res.send({
				film,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400);
		return res.send('Some thing wrong, please try again.');
	}
};

const checkDateOfFilm = ({ start_record, premiere_date }) => {
	const currentDate = moment();
	if (
		!start_record ||
		!premiere_date ||
		moment(currentDate).isBefore(moment(start_record, 'YYYY-MM-DD')) ||
		moment(currentDate).isAfter(moment(premiere_date, 'YYYY-MM-DD'))
	) {
		return false;
	}
	return true;
};

module.exports.addFilms = async (req, res) => {
	const film = req.body;
	try {
		// check manufacturer
		const manufacturer = await Manufacturers.findById(film.manufacturer);
		if (!manufacturer) {
			console.log('Invalide manufacturer');
			res.status(400);
			return res.send('Invalide manufacturer');
		}

		// check date time
		const check = checkDateOfFilm({
			start_record: film.start_record,
			premiere_date: film.premiere_date,
		});

		if (!check) {
			console.log('Invalide Date time');
			res.status(400);
			return res.send('Invalid Date time');
		}

		// Insert Film
		await Films.insertMany(film);
		return res.send('success');
	} catch (error) {
		console.log(error);
		res.status(400);
		res.send('Some thing wrong, please try again.');
	}
};

module.exports.removeFilm = async (req, res) => {
	const { id } = req.params;
	try {
		await Films.findByIdAndRemove(id);
		return res.send('success');
	} catch (error) {
		console.log(error);
		res.status(400);
		return res.send('Some thing wrong, please try again.');
	}
};

module.exports.editFilm = async (req, res) => {
	const { id } = req.params;
	const editedFilm = req.body;
	try {
		const film = await Films.findById(id);

		if (!film) {
			res.status(400);
			return res.send('This film does not exist');
		}

		// check date time
		const check = checkDateOfFilm({
			start_record: editedFilm.start_record,
			premiere_date: editedFilm.premiere_date,
		});

		if (!check) {
			res.status(400);
			return res.send('Invalid Date time');
		}

		await Films.findByIdAndUpdate(id, editedFilm);

		return res.send('success');
	} catch (error) {
		res.status(400);
		return res.send('Some thing wrong, please try again.');
	}
};
