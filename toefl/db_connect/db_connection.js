var mysql = require('mysql');
var express=require('express');
var app=express();
var path=require('path');
var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port : 3306,
  database: "tofel_db"
});


function inser_record(start,end){

sqls = []
for(var num=start; num<=end; num+=1){
  //read txt file
  console.log(num);
  var file_path = ("../readings/"+num+".txt");
  console.log(file_path);
  data = fs.readFileSync(file_path, "utf8");
  console.log(num);
  sqls[num] = 'insert into reading values ('+num+', \"'+data+'\");';
};

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  for(var i in sqls){
    // console.log(sql);
    con.query(sqls[i], function (err, result) {
    if (err) throw err;
      console.log("1 record inserted");
    });
  };
});
};

//delete
function delete_record(i){
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query('delete from reading where id=?',i, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
  });
});
};
