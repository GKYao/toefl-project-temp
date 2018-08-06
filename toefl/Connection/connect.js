const mysql = require('mysql');
const express=require('express');
const app=express();
const path=require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
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

module.exports.ArticlesGetOne=function(req,res){
try{
var id=req.params.id;
  con.query("SELECT article FROM reading where id="+id+"", function (err, data, fields) {
    // var result=JSON.stringify(data[0].article);
    // result=result.replace(/\\n/g, '<br />');
    if(err){console.log(err);}
      res
      .status(200)
      .json(data[0]);
  });
  con.query("UPDATE users SET page='"+id+"' WHERE username='"+req.body.username+"'", function (err, data, fields) {
    if(err){console.log(err);}
  });
}catch(ex){
  console.log(ex);
}
};

module.exports.SignUpUsers=function(req,res){
try{
  con.query("SELECT password FROM users where username='"+req.body.username+"'", function (err, data, fields) {
  // if (err) throw err;
  if (data && data.length ) {
      console.log('Username was taken!');
        result={"result":"taken",}
        try{
         res
         .json(result);}
        catch(ex){console.log(ex);}
  } else {
      console.log('No username was found!');
      //register into database
      var sql='';
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){console.log(err);}
        sql='INSERT INTO users(username,password) values('+JSON.stringify(req.body.username)+', \"'+hash+'\");';
        con.query(sql, function (err, result) {
           if (err) throw err;
            console.log("1 record inserted");
            //send response
              result={
                "result":"success",
              }
              try{
               res
               .json(result);}
              catch(ex){console.log(ex);}
          });
      });
      }
  });
}catch(ex){
  console.log(ex);
}
};

module.exports.getVocab=function(req,res){
  try{
    con.query("SELECT "+req.body.username+" FROM vocab where "+req.body.username+"!='NULL'", function (err,data){
      try{
       res
       .json(data);}
      catch(ex){console.log(ex);}
    });}
  catch(ex){
    console.log(ex);
  }
};


module.exports.UserPage=function(req,res){
  try{
    con.query("SELECT page FROM users where username = '"+req.body.username+"'", function (err,data){
      try{
        result={"page":data[0]['page']};
       res
       .json(result);}
      catch(ex){console.log(ex);}
    });}
  catch(ex){
    console.log(ex);
  }
};
