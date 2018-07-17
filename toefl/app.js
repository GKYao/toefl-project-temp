const express = require("express");
const http = require("http");
const path = require("path");
const logger = require('morgan')
const mysql = require('mysql');
const routes = require('./routes');
const connect = require('./connection/connect');
const login = require('./login/login');
const word = require('./words/word');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist/toefl')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/toefl/index.html'));
});

app.post("/signup", function(req, res) {
 connect.SignUpUsers(req,res);
 });

app.post("/api/reading/:id", function(req, res) {
  connect.ArticlesGetOne(req,res);
  });

 app.post("/word", function(req, res) {
   word.SaveWord(req,res);
  });
  app.post("/translate", function(req, res) {
    word.translateWord(req,res);
   });
 app.post("/login", function(req, res) {
  login.LoginUsers(req,res);
  });
  app.post("/userpage", function(req, res) {
   connect.UserPage(req,res);
   });
var port = process.env.PORT||3000;
app.listen(port, function () {
  console.log('App listening on port 3000!');
});

app.post("/vocab", function(req, res) {
 connect.getVocab(req,res);
 });

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   port : 3306,
//   database: "tofel_db"
// });
//
// con.connect(function(err) {
//   if (err) throw err;});
//
//   con.query("ALTER table users add column page int(11) Not NULL default 1", function (err) {
//     console.log("yes");
// });
