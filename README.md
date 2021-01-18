# query-parser-api
This repo contains code for a web application which is able to store and retrieve data over HTTP-based
API. Data is not persisted meaning it is stored it in-memory. 
This is a toy api intending to showcase RESTAPI implementation using Node-Express. 

### END point Details
Detailed functionality is give below:
### Number of APIs : 2
#### /store?query=EQUAL(id,"abc")
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
#### /store
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
#### Demo

### Swagger Doc
Try out the doc:  http://54.213.94.227:3000/api-docs/#/
