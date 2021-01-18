# query-parser-api
This repo contains code for a web application which is able to store and retrieve data over HTTP-based
API. Data is not persisted meaning it is stored it in-memory. 
This is a toy api intending to showcase RESTAPI implementation using Node-Express. 

### END point Details
Detailed functionality is give below:
#### Number of APIs : 2
##### /store?query=EQUAL(id,"abc")
Method: GET 

Result
```
200 OK
[
{
"id": "abc",
"title": "Alphabet",
"content": "A, B, C, ...",
"views": 1,
"timestamp": 1555832341
}
```
##### /store
Method: POST
Body
```
{
"id": "first-post",
"title": "My First Post",
"content": "Hello World!",
"views": 1,
"timestamp": 1555832341
}
```
Result 
```
200 OK
```
# Technical Details
- Node framework
- Javascript (ES6) language
- Express server
- Jest based test suit
- Valid url to validate the url 
- swagger-ui-express and swagger-jsdoc for api documentation and trying it out 

## Assumption and considerations
- In this implementaion, I have covered only first level query structure. Meaning, all of the following queries can be parsed and executed
```
OR(EQUAL(id,"first-post"),EQUAL(views,100))
AND(EQUAL(id,"first-post"),EQUAL(views,1))
NOT(EQUAL(id,"first-post"))
GREATER_THAN(views, 2)
LESS_THAN(views, 20)
```
BUT, Nested queries like `OR(AND(EQUAL(id,"first-post"),EQUAL(views,100))),GREATER_THAN(views, 2)) ` is <b> NOT SUPPORTED </b>.
 #### Query parser 
 The query string looks like <b> prefix</b> operation expression. Hence I have decided to break down the following: 
 - First convert `AND(EQUAL(id,"first-post"),EQUAL(views,1))`  to `A(E(id,"first-post"),E(views,1))`. In this way, it is easy to process.
 - Second, Process Scalar operations like Greater than, Less than, Equal. Hence, `A(E(id,"first-post"),E(views,1))` to `A(key1,key2)` and store this value in a dictionary. `key1: "id === 'first-post'" ` [ Note: === is beause it is Javascript] 
 - Third, Handle special case of NOT. A valid NOT operation MUST be followed by EQUAL operation.So, find NOT operation, replace the dictionary entry with `!==`; and further simplify the query string with the key. By now, the modified query string will look like `A(key1, key2)` or scalar operation will look like `key1` 
 - Fourth, remove all `(`, `)` , and `,` and replace with space. 
 - Fifth, the query is `A key1 key2 `. This looks like prefix operation. This is ready for infix operation. 
 - Finally, convert prefix to infix and generate valid query string. `AND(EQUAL(id,"first-post"),EQUAL(views,1))` => `id === 'first-post' && view === 1` 
#### Implementation explanation
https://www.loom.com/share/bcae5cecfb114a4f990619f935ae3dfa
## Demo
https://www.loom.com/share/585de9825cd6418cbd646d2ee1da8112

## Swagger Doc
Try out the doc:  http://54.213.94.227:3000/api-docs/#/

### How to run this server
I am using Amazon EC2 freetier instace to host this and running it from there. 
Host is : `"54.213.94.227:3000/store"`

However, if you want to try  out,  there are dependencies. 
- nvm to isntall Node (latest version) 
- install npm 
- clone this repo
- go to the folder (query-parser-api)/ 
- run `npm install`
- execute script:  `npm run start`

this should start running on port `3000`. 
 
### Test Case coverage report 
```
--------------------|---------|----------|---------|---------|--------------------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s              
--------------------|---------|----------|---------|---------|--------------------------------
All files           |   91.47 |    79.49 |     100 |   91.41 |                                
 handler            |   91.41 |    79.49 |     100 |   91.34 |                                
  queryGenerator.js |    97.3 |    85.71 |     100 |   97.26 | 145-146                        
  requestHandler.js |   83.33 |    72.22 |     100 |   83.33 | 29,53-56,73-74,101-102,118-119 
 tests/data         |     100 |      100 |     100 |     100 |                                
  dummyData.js      |     100 |      100 |     100 |     100 |                                
--------------------|---------|----------|---------|---------|--------------------------------
```
### File Structure
```
handler 
|
| -  queryGenerator.js   (Takes the Query string and convert from Prefix to infix operation)                    
| - requestHandler.js   (Handles get and post endpoints)
| - index.js
routes
|
| - index.js
| - swagger.json (Documents explaining the endpoints)
tests
|- data
   |- dummyData.js
| - controller
   | - requestHandler.spec.js (test cases covering methods from requestHandler) 
| - unit
   | - queryParser.spec.js   (test cases covering methods from queryGenerator)
| - server.js (running the server)
```

