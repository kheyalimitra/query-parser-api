var url = require('url');
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

const isValidURL = (urlStr) => {
  var url_parts = url.parse(urlStr, true);
  if(url_parts && url_parts.search > 0) {
      return true;
  } else {
    return false;
  }
};

const handleGetQuery = (urlStr, query) => {
  if (isValidURL(urlStr)) {
    console.log(`internal query string for Array filter : ${query}`);
    const parsedQuery = parseQueryString(query);
    const result = findData(parsedQuery);
    return result;
  } else {
    return null;
  }
}

 module.exports = {handleGetQuery};