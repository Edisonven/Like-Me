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
    console.log("mostrando todos los posts", rows);
  } catch (error) {
    console.log("ha ocurrido un error", error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al procesar tu solicitud" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    if (!titulo || !url || !descripcion) {
      console.log("No pueden haber campos vacíos");
      return;
    }
    const id = Math.floor(Math.random() * 9999);
    const query =
      "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5);";
    const values = [id, titulo, url, descripcion, 0];
    const { rows } = await pool.query(query, values);
    res.json("post agregado con éxito");
  } catch (error) {
    console.log("ha ocurrido un error al postear");
    res.status(400).json({ message: "error al procesar la operación " });
  }
});

app.listen(3000, () => {
  console.log("puerto en funcionamiento");
});
