const db = require("../models");

// Defining methods for the articlesController
module.exports = {

  /*findAll: function runQuery(numArticles, queryURL) {

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "NYTData"
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=paris"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(NYTData) {
  
      // Logging the URL so we have access to it for troubleshooting
      console.log("------------------------------------");
      console.log("URL: " + queryURL);
      console.log("------------------------------------");
  
      // Log the NYTData to console, where it will show up as an object
      console.log(NYTData);
      console.log("------------------------------------");
  
    },*/

  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
