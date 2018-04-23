// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

// importing MongoDB Models
var db = require("./models");

var PORT = 3000;


// initializing Express server
var app = express();


app.use(logger("dev"));

// using Body-Parser 
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connecting to Heroku database if deployed; otherwise connecting to local `mongoHeadlines` database
var MONGODB_URI = process.env.MONGODB_URI  || "mongodb://localhost/mongoHeadlines";



// built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Connecting to the Mongo DB
mongoose.connect(MONGODB_URI);




// Routes ======================



// scraping articles from The Marshall Project's news page 
app.get("/scrape", function(req, res) {

 axios.get("https://www.themarshallproject.org/tag/news?hp").then(function(response) {

    var $ = cheerio.load(response.data);

    $("div.tease-headline-std").each(function(i, element) {
    
        var result = {};
        
        result.headline = $(this)
        .children("a")
        .text();
        result.sumarry = $("div.tease-deck")
        .children("a")
        .text();
        result.link = $(this)
        .children("a")
        .attr("href");

     db.Article.create(result)
        .then(function(dbArticle) {
        // console logging result for added article
        console.log(dbArticle);
        })
        .catch(function(err) {
            return res.json(err);
        })
    })
    // if successful, send message
    res.send("Scraped!");

 });
});


app.listen(PORT, function() {
    console.log("App running on http://localhost:" + PORT + "!");
  });
