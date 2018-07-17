const mysql = require('mysql');
const express=require('express');
const app=express();
const bcrypt = require('bcrypt');
const connect=require('../connection/connect.js');
const translate = require('google-translate-api');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port : 3306,
  database: "tofel_db"
});
con.connect(function(err) {
  if (err) throw err;});

module.exports.SaveWord=function(req,res){
  con.query("SHOW COLUMNS FROM `vocab` LIKE '"+req.body.username+"'", function (err, data, fields) {
  if (err) throw err;
  if (data && data.length ) {
      console.log('User Exist!');
      //save word
      try{
      con.query("SELECT id FROM vocab where "+req.body.username+"='"+req.body.word+"'", function (err, data, fields) {
        if(data && data.length){}
        else{
          sql="SELECT id FROM vocab where "+req.body.username+"='NULL'";
          con.query(sql, function (err, data, fields) {
            if (err) throw err; console.log(data);
            if (data && data.length ){
              con.query("UPDATE vocab SET "+req.body.username+"='"+req.body.word+"' WHERE id='"+data[0].id+"'", function (err) {
              if (err) throw err;
              result={"result":"updated",}
              try{
               res
               .json(result);}
              catch(ex){console.log(ex);}
              });
            }
            else{
              con.query("INSERT INTO vocab("+req.body.username+") values('"+req.body.word+"')", function (err){
                 if (err) throw err;
                 result={"result":"inserted",}
                 try{
                  res
                  .json(result);}
                 catch(ex){console.log(ex);}
              });
            }
          });
        }
      });
    }catch(ex){console.log(ex);}
  } else {
      console.log('User No Found!');
      //create COLUMN
       try{
       con.query("ALTER table vocab add column "+req.body.username+" varchar(50) Not NULL default'NULL'", function (err) {
       // if (err) throw err;
       });
      //save word
          con.query("INSERT INTO vocab("+req.body.username+") values('"+req.body.word+"')", function (err){
             // if (err) throw err;
             result={"result":"inserted",}
             try{
              res
              .json(result);}
             catch(ex){console.log(ex);}
          });
      }catch(ex){console.log(ex);}
    }
  });
};


module.exports.translateWord=function(req,res){
  translate(req.body.word, {to: 'zh-CN'}).then(red => {
      translation=red.text;
      var body={"result":translation};
      try{
       res
       .json(body);}
      catch(ex){console.log(ex);}
  }).catch(err => {
      console.error(err);
  });
};
