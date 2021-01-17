var express = require('express');
var router = express.Router();
const { handleGetQuery }  = require('../handler/requestHandler');

/* GET home page. */
router.get('/store', function(req, res, next) {
  const {query: queryStr} = req.query;
  console.log(queryStr);
  const result = handleGetQuery(queryStr);
  console.log(result);
  res.status(200).send(result);
  // res.render('index', { title: 'Express' });
});

router.post('/store', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
