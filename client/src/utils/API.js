import axios from "axios";

const APIkey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";


export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  searchArticle: function(query){
    console.log("My full query " + baseURL + APIkey + query);
    return axios.get(baseURL + APIkey + query);
  } 
  
};
