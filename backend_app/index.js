const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "likeme",
  allowExitOnIdle: true,
});

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("puerto en funcionamiento");
});
