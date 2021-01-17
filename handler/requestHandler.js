const validUrl = require('valid-url');
const { parseQueryString }  = require('./queryGenerator') ;

const DYNAMIC_DATA_STORAGE = {
  "first-post" : {
    "id": "first-post",
    "title": "My First Post",
    "content": "Hello World!",
    "views": 100,
    "timestamp": 1555832341
  },
  "second-post": {
    "id": "second-post",
    "title": "My second Post",
    "content": "Hello World!",
    "views": 10,
    "timestamp": 1555832354
  }
};

const isValidURL = (req) => {
  const urlStr = `${req.protocol}://${req.get('host')}/${req.url}`;
  if (validUrl.isUri(urlStr)) {
    return true;
  } else {
    return false;
  }
};

const findData = (query) =>{
  const entries = Object.values(DYNAMIC_DATA_STORAGE);
  const result = entries.filter((item) => {
    return eval(`with (item) { ${query} }`);
  }); 
  return result;
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
    if (result) {
      if (result.length > 0) {
        res.status(200).send(result);
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

const handlePostRequest = (req) =>  {
  try {
    const {
      id,
      title,
      content,
      views,
      timestamp = Date.now(), // optional field
    } = req.body;
    // Since the ID will be unique, just override if existing. 
    DYNAMIC_DATA_STORAGE[id] = {id, title, content, views, timestamp};
    return true;
  } catch (error) {
    console.log(`error occured, ${error}`);
    return false;
  }

}
const postStoreDetails = (req, res) => {
  try {
    const result = handlePostRequest(req);
    if (result) {
      res.status(200).send({});
    }
    else {
      console.log('Invalid request.');
      res.status(400).send({ error: 'bad request.' });
    }
  }
  catch (error) {
    console.log(`error has occured: ${error}`);
    res.status(500).send({ error: 'something went wrong, please try with valid request.' });
  }
};

 module.exports = {getStoreDetails, postStoreDetails};