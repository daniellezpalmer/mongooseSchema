const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var movieSchema = new Schema({
  title: {type: String, required: true, unique: true},
  characters: [String],
  release: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
