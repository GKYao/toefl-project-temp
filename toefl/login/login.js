const mysql = require('mysql');
const express=require('express');
const app=express();
const bcrypt = require('bcrypt');
const connect=require('../connection/connect.js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port : 3306,
  database: "tofel_db"
});
try{
con.connect(function(err) {
  if (err) throw err;});
}catch(ex){
  console.log(ex);
}
module.exports.LoginUsers=function(req,res){
  try{
  con.query("SELECT password FROM users where username='"+req.body.username+"'", function (err, data, fields) {
  if (err) throw err;
  if (data && data.length ) {
      console.log('User Exist!');
      //checking user validation
      if(bcrypt.compareSync(req.body.password, data[0].password)){
     // Passwords match
     result={"result":"success",}
     try{
      res
      .json(result);}
     catch(ex){console.log(ex);}
      } else {
     // Passwords don't match
     result={"result":"wrong",}
     try{
      res
      .json(result);}
     catch(ex){console.log(ex);}
      }
  } else {
      console.log('No username was found!');
      result={"result":"nouser",}
      try{
       res
       .json(result);}
      catch(ex){console.log(ex);}
      }
  });
}catch(ex){console.log(ex);}
};
