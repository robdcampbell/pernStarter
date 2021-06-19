const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const pool = require("./config/db");
// const jwtAuth = require('./routes/jwtAuth.js')

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", require("./routes/jwtAuth.js"));
// Dashboard
app.use("/dashboard", require("./routes/dashboard"));

// Simple Test Route:
app.get("/", (req, res) => {
  res.status(200).json("Pterrible Pterodactyls Batman!");
});
// Simple UserList Route:
app.get("/user-list", async (req, res) => {
  const data = await pool.query("SELECT * FROM USERS");
  res.status(200).json(data.rows);

  //res.status(200).json("Alright Alright Alright");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
