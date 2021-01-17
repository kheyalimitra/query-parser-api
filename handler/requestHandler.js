const { parseQueryString }  = require('./queryParser') ;
const DYNAMIC_DATA_STORAGE = [
    {
    
        "id": "first-post",
        "title": "My First Post",
        "content": "Hello World!",
        "views": 1,
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
  const result = DYNAMIC_DATA_STORAGE.filter(item => item.id === 'first-post');
  return result;
};

const handleGetQuery = (queryStr) => {
  // validation needed for the param
  const parsedQuery = parseQueryString(queryStr);
  console.log(parsedQuery);
  const result = findData(parsedQuery);
  return result;
}

 module.exports = {handleGetQuery};