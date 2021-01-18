var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
const { getStoreDetails, postStoreDetails }  = require('../handler/requestHandler');

router.get('/store', function(req, res) {
  return getStoreDetails(req, res);
});

router.post('/store', function(req, res) {
  return postStoreDetails(req, res);
});

module.exports = router;

