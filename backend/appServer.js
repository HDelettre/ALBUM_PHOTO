// EXPRESS
const express = require("express");

// LOADING ENVIRONMENT VARIABLES - PORT_USED
require("dotenv").config({
  path: "./config/.env"
});

// PATH TO ROUTES
const usersRoutes = require('./routes/usersRoutes');
const albumsRoutes = require('./routes/albumsRoutes');
const picturesRoutes = require('./routes/picturesRoutes');

// CORS PACKAGE
const cors = require('cors');

// MYSQL / SEQUELIZE
const sequelize = require('./config/database');
// Synchronization of models
require('./models/usersModel');
require('./models/albumsModel');
require('./models/picturesModel');
sequelize.sync({alter: true});

const app = express();
app.use(express.json());

app.use("/pictures", express.static(__dirname + "/pictures"));

// CORS
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// ROUTES CALLING
app.use('/api/users', usersRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/pictures', picturesRoutes);

// EXPORTS
module.exports = app;