const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const usersRoutes = require("./routes/user");
require("dotenv").config();

const USER = process.env.NODE_APP_USER;

const app = express();

// mongoose config
mongoose
  .connect(
    `mongodb+srv://${USER}@cluster0.kvnz0ub.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// express config
app.use(express.json());

// CORS resolver
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

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", usersRoutes);

module.exports = app;
