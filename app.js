const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded()); //x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  // we allowed a specific origin to access our content, our data
  res.setHeader("Access-Control-Allow-Origin", "*");
  // now we allow these origins to use specified http methods bacause by just unlocking the origins, it would still not work
  //we also need to tell the clients, the origins which methods are allowed
  res.setHeader("Access-Control-Allow-Method", "GET, PUT, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
});

mongoose
  .connect(
    "mongodb+srv://kietng:yukino103@cluster0.ycresv7.mongodb.net/message?retryWrites=true&w=majority"
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));

