var express = require('express');
var router = express.Router();
const { getStoreDetails, postStoreDetails }  = require('../handler/requestHandler');

router.get('/store', function(req, res) {
  return getStoreDetails(req, res);
});

router.post('/store', function(req, res) {
  return postStoreDetails(req, res);
});

module.exports = router;

