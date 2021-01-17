var express = require('express');
var router = express.Router();
const { handleGetQuery }  = require('../handler/requestHandler');

/* GET home page. */
router.get('/store', function(req, res) {
  try {
    const {query: queryStr} = req.query;
    console.log(`internal query string for Array filter : ${queryStr}`);
    const result = handleGetQuery(queryStr);
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


  // res.render('index', { title: 'Express' });
});

router.post('/store', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
