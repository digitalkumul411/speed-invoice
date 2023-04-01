require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");

// import routes
const clients = require("./routes/clientRoutes");
const invoices = require("./routes/invoiceRoutes");
const profiles = require("./routes/profileRoutes");
const inventory = require("./routes/inventoryRoutes");
const user = require("./routes/userRoutes");

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// routes
app.get("/", (req, res) => {
  res.status(200).send("connected");
});

app.use("/api/v1", [clients, profiles, inventory, invoices, user]);

// create http server
const server = http.createServer(app);

const DB_URL = process.env.MONGO_URI;
// connect to db
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log("\n\tCONNECTED TO DATABASE\n");
      console.log(`\n\tserver listening on PORT:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.log("--- error ---");
    console.error(err.message);
  });

// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
