var createError = require('http-errors');
var express = require('express');
var path = require('path');
// bodyParser = require("body-parser"),
// swaggerJsdoc = require("swagger-jsdoc"),
// swaggerUi = require("swagger-ui-express");
var indexRouter = require('./routes/index');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'jade');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// /**
//  * Swagger doc 
//  */
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Simple API with Swagger",
//       version: "0.1.0",
//       description:
//         "This is a simple CR API application made with Express and documented with Swagger",
//       license: {
//         name: "MIT",
//       },
//       contact: {
//         name: "Kheyali Mitra",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/store",
//       },
//     ],
//   },
//   apis: ["./routes/index.js"],
// };

// const specs = swaggerJsdoc(options);
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs)
// );
app.listen(3000, () => {
  console.log(`Listening on port 3000! ...`);
});

module.exports = app;
