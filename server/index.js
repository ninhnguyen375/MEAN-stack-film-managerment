const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/filmsdb', {
	useNewUrlParser: true,
	useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// APIs
const filmRouter = require('./api/routes/film.api.route');
const manufacturerRouter = require('./api/routes/manufacturers.api.route');

app.use('/api/films', filmRouter);
app.use('/api/manufacturers', manufacturerRouter);

app.listen(port, () => console.log(`listen on port ${port}`));
