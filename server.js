var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");


var db = require("./models");

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connecting to Heroku database if deployed; otherwise connecting to local `mongoHeadlines` database
var MONGODB_URI = process.env.MONGODB_URI  || "mongodb://localhost/mongoHeadlines";

// built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Connecting to the Mongo DB
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


