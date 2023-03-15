require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;
const http = require("http");
const morgan = require("morgan");

// import routes
const clients = require("./routes/clientRoutes");
const invoices = require("./routes/invoiceRoutes");
const profiles = require("./routes/profileRoutes");
const inventory = require("./routes/inventoryRoutes");

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// routes
app.get("/", (req, res) => {
  res.status(200).send("connected");
});

app.use("/api/v1", [clients, profiles, inventory, invoices]);

// create http server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`\nserver listening on PORT:${PORT}\n`));
