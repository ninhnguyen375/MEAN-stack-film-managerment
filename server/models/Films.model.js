const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const filmsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  director: { type: String, required: true },
  manufacturer: { type: String, required: true },
  start_record: { type: String, required: true },
  premiere_date: { type: String, required: true }
});

module.exports = mongoose.model('Films', filmsSchema);
