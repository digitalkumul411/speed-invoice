require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;
const http = require("http");

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("connected");
});

// create http server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`\nserver listening on PORT:${PORT}\n`));
