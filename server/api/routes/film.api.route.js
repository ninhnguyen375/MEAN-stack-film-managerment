const express = require('express');
const multer = require('multer');

const controller = require('../controllers/film.api.controller');

const router = express.Router();

// config upload file
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/img/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// upload img
router.post('/upload/img', upload.single('img'), (req, res) => {
	res.send('success');
});

// Add film
router.post('/', controller.addFilms);

// get
router.get('/', controller.getFilms);
router.get('/:id', controller.getFilm);

// Remove film
router.delete('/:id', controller.removeFilm);

// Edit film
router.put('/:id', controller.editFilm);

module.exports = router;
