const validUrl = require('valid-url');
const { parseQueryString }  = require('./queryGenerator') ;

const DYNAMIC_DATA_STORAGE = [
    {
    
        "id": "first-post",
        "title": "My First Post",
        "content": "Hello World!",
        "views": 100,
        "timestamp": 1555832341
    },
    {
    
        "id": "second-post",
        "title": "My second Post",
        "content": "Hello World!",
        "views": 10,
        "timestamp": 1555832354
    }
  ];

const findData = (query) =>{
  const result = DYNAMIC_DATA_STORAGE.filter((item) => {
    return eval(`with (item) { ${query} }`);
  }); 
  return result;
};

const isValidURL = (req) => {

  const urlStr = `${req.protocol}://${req.get('host')}/${req.url}`;
  const isValid = validUrl.isUri(urlStr);
  if (validUrl.isUri(urlStr)) {
    return true;
  } else {
    return false;
  }
};

const handleGetQuery = (req) => {
  if (isValidURL(req)) {
    const { query } = req.query;
    console.log(`internal query string for Array filter : ${query}`);
    const parsedQuery = parseQueryString(query);
    const result = findData(parsedQuery);
    return result;
  } else {
    return null;
  }
};

const getStoreDetails = (req, res) => {
  try {
    const result = handleGetQuery(req);
    console.log ('result from handleGetQuery', result);
    if (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      }
      else {
        //no data found
        res.status(200).send({ response: "no data found" });
      }
    }
    else {
      console.log('Invalid request.');
      res.status(400).send({ error: 'bad request.' });
    }
  }
  catch (error) {
    console.log(`error has occured: ${error}`);
    res.status(500).send({ error: 'something went wrong, please try with valid query.' });
  }
};

 module.exports = {getStoreDetails};