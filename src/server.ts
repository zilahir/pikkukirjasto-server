import express from "express";
import serverless from 'serverless-http'

import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import profile from "./routes/api/profile";
import book from "./routes/api/book"
import file from './routes/api/upload'
import borrow from './routes/api/borrow';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.send(200);
  } else {
      return next();
  }
});

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '50mb', parameterLimit: 100000 }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send({
    prod: false,
    running: true,
    ver: 0.1,
  });
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use('/api/book', book)
app.use('/api/file', file)
app.use('/api/borrow', borrow)

const port = app.get("port");

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;

//module.exports.handler = serverless(app);