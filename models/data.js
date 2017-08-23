const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    runTime: {
      time: {type: Number},
      increment: {type: String}
    },
    characters: [String]
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
