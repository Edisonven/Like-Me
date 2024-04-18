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
  try {
    const query = "SELECT * FROM posts;";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.log("ha ocurrido un error", error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al procesar tu solicitud" });
  }
});

app.listen(3000, () => {
  console.log("puerto en funcionamiento");
});
