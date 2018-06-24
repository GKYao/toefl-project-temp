
const mysql = require('mysql');
const express=require('express');
const app=express();
const path=require('path');
const fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port : 3306,
  database: "tofel_db"
});

con.connect(function(err) {
  if (err) throw err;});

module.exports.ArticlesGetOne=function(req,res){
var id=req.params.id;
  con.query("SELECT article FROM reading where id="+id+"", function (err, data, fields) {
    var result=data[0].article;
    result=result.replace(new RegExp('\r?\n','g'), '<br />');
    if (err) throw err;
      res
      .status(200)
      .json(result);
  });
};
