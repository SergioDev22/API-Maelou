const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const utilsRoutes = require("./routes/utils");
const alertRoutes = require("./routes/alert");

const app = express();

// Anticipation des erreurs CORS de toute les routes
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/utils", utilsRoutes);
app.use("/api/v1/alert", alertRoutes);
app.use("/pdc", express.static(path.join(__dirname, "pdc")));

module.exports = app;
