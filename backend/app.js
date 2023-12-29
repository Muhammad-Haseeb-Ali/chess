const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require('cors')
const socketHandler = require("./socket/socketHandler");
const connectDb = require("./config/connectDb");
// const stockFish = require("stockfish");
dotenv.config();

const usersRouter = require("./routes/userRoute");

const app = express();
const server = http.createServer(app);

const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({
  origin: (_,cb)=>cb(null,true),
  credentials: true,
}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", usersRouter);

app.get("/", (req, res) => {
  var origin = req.get("origin");
  var host = req.get("host");
  console.log("hosts", origin, host);
  res.status(200).send({ host, origin });
});


connectDb(DATABASE_URL);


socketHandler(server);
module.exports = { app, server };
