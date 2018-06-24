var express = require('express');
var router = express.Router();
var ctrlArticles = require('../controllers/article.ctrl.js');


router
  .route('/reading/:id')
  .get(ctrlArticles.ArticlesGetOne);

module.exports = router;
