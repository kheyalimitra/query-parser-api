var express = require('express');
var router = express.Router();
const { handleGetQuery }  = require('../handler/requestHandler');

router.get('/store', function(req, res) {
  try {
    const result = handleGetQuery(req.url, req.query);
    if (result && result.length > 0) {
      res.status(200).json(result);
    } else {
      // no data found
      res.status(200).send({ response: "no data found"});
    }
  } catch(error) {
    console.log(`error has occured: ${error}`);
    res.status(500).send({error: 'something went wrong, please try with valid query.'})
  }
});

router.post('/store', function(req, res) {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
