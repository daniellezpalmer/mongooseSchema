const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const mongodb = require('mongodb')
const mustache = require('mustache')
const mustacheExpress = require('mustache-express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/disneyMovie')
mongoose.Promise = require('bluebird')
const app = express()
const Movie = require('./models/movie')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  Movie.find()
  .then(function(movie){
    res.render('index', {movie: movie});
  })
})

app.post('/add', function(req, res){
  let title = req.body.title;
  console.log("title", title);
  let characters = req.body.characters;
  console.log(characters);
  let release = req.body.release;
  console.log(release);
  // const movie = new Movie({title: title}, {release: release}, {characters: characters});
  // movie.save().then(function () {
    // res.redirect('/');
  // })
  Movie.create({
        title: title,
        characters: [characters],
        release: release
      })
      .then(function(results) {
        console.log('Hell yeah obvi')
        res.redirect('/');
      })
      .catch(function(error) {
        console.log('damn error ' + JSON.stringify(error));
      })
});

app.post('/delete/:title', function(req, res){
  let name = req.params.title;
  Movie.deleteOne({title: name})
  .then(function(){
    res.redirect('/');
  })
})

app.listen(3000, function() {
  console.log('Listening on 3000!');
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});

// Movie.create({
//       title: "Lion King",
//       characters: ["Simba ", "Timon ", "Pumba ", "Mufasa ", "Scar "],
//       release: {
//         month: 6,
//         day: 24,
//         year: 1994,
//       }
//     })
//     .then(function(results) {
//       console.log('Hell yeah obvi')
//     })
//     .catch(function(error) {
//       console.log('damn error ' + JSON.stringify(error));
//     })

    process.on('SIGINT', function() {
      console.log("\nshutting down");
      mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected on app termination');
        process.exit(0);
      });
    });
