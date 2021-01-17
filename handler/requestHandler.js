const { parseQueryString }  = require('./queryParser') ;
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

const handleGetQuery = (queryStr) => {
  const parsedQuery = parseQueryString(queryStr);
  // validation needed for the param
  const result = findData(parsedQuery);
  return result;
}

 module.exports = {handleGetQuery};