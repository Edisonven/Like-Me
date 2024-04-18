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

app.get("/posts", async (req, res) => {
  const query = "SELECT * FROM posts;";
  const { rows } = pool.query(query);
  res.json(rows);
});

app.listen(3000, () => {
  console.log("puerto en funcionamiento");
});
