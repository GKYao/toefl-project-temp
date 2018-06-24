const express = require("express");
const http = require("http");
const path = require("path");
const logger = require('morgan')


const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist/toefl')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/toefl/index.html'));
});

var port = process.env.PORT||3000;
app.listen(port, function () {
  console.log('App listening on port 3000!');
});
