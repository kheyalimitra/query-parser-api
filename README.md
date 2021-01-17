# query-parser-api
This repo contains code for a web application which is able to store and retrieve data over HTTP-based
API. Data is not persisted meaning it is stored it in-memory. 
This is a toy api intending to showcase RESTAPI implementation using Node-Express. 

## END point Details
Detailed functionality is give below:
### Number of APIs : 2
### /store?query=EQUAL(id,"abc")
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
### /store
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
