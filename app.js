  const bodyParser = require('body-parser');
  const express = require('express');
  const mongodb = require('mongodb');
  const mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');
  const mustache = require('mustache');
  const mustacheEpxress = require('mustache-express');

  mongoose.connect('mongodb://localhost:27017/disneyMovie');
