const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const dbManager = require("./controllers/dbManager");

const app = express();

const allowedOrigins = [
  "https://www.tyerra.com",
  "https://tyerra.com",
  // "https://test.tyerra.com",
  // "https://dev.tyerra.com"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log({ origin })
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbManager.initialize();

app.set("port", process.env.PORT || 3001);
app.use(express.json());
// app.use(
//   cors(corsOptions)
// );

app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));

module.exports = app;
