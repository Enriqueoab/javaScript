const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // "*" can be our especific url. * = any server
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET'); // To restrict the HTTP methods allowed
  next();
});

app.use(locationRoutes);

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
//   next();
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || 'Unknown User';
//   res.render('index', {
//     user: userName
//   });
// });

app.listen(3000);
