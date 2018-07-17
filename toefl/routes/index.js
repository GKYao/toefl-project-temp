var express = require('express');
var router = express.Router();
var connect = require('../connection/connect.js');

router.post('/reading/:id',connect.ArticlesGetOne);

module.exports = router;
