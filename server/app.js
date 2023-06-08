const express = require("express");
const cors = require('cors'); // or localhost cors policy
const morgan = require('morgan'); //view api call log
const path = require('path'); // For accessing image from backend


// Only require in server.js. all .env variables are avaiable everywhere in backend project
require('dotenv').config(); 
const connectToMongoDB = require('./config/database');

const app = express();
const port = process.env.PORT;



//Method to make connection with mongodb
connectToMongoDB();

//============================= Middleware =================================

// This is middleware for accessing image from static folder of backend
app.use('/public', express.static(path.join(__dirname, 'public')));

// middleware (if we want to use api body content then we should must add this middleware)
app.use(express.json());
// cors() method is used to handle cors policy. -: 'http://localhost:----' has been blocked by CORS policy:
app.use(cors());
app.use(morgan("tiny"));



// Route for accounts
// app.use("/api/accounts", require("./api/account/account.routes"));
app.use("/api/accounts", require("./routes/account"));

// Route for transaction
// app.use("/api/transactions", require("./api/transaction/transaction.routes"));
app.use("/api/transactions", require("./routes/transaction"));

// Route for user
// app.use("/api/users", require("./api/user/user.routes"));
app.use("/api/users", require("./routes/user"));

// Route for auth
app.use("/api/auth", require("./routes/auth"));



app.listen(port, () => {
  console.log(`Server is running successfully on port ${port}`);
});



// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
