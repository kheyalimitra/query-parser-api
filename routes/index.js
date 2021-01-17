var express = require('express');
var router = express.Router();
const { getStoreDetails }  = require('../handler/requestHandler');

router.get('/store', function(req, res) {
  return getStoreDetails(req, res);
});

router.post('/store', function(req, res) {
});

module.exports = router;

