const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config({ path: "./.env" });

// Variables de entorno
const password = process.env.PASSWORD;
const user = process.env.USER;
const db = process.env.DB;
const host = process.env.HOST;

const pool = new Pool({
  host: host,
  user: user,
  password: password,
  database: db,
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
    return rows;
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
    return rows;
  } catch (error) {
    console.log("ha ocurrido un error al postear");
    res.status(400).json({ message: "error al procesar la operación " });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const likes = "SELECT likes FROM posts WHERE id = $1";
    const result = await pool.query(likes, [id]);
    const currentLike = result.rows[0].likes;
    const updateLikes = currentLike + 1;
    const query = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values = [updateLikes, id];
    const { rows } = await pool.query(query, values);
    res.json({ likes: updateLikes });
    return rows;
  } catch (error) {
    console.log("ha ocurrido un error", error);
    res
      .status(400)
      .json({ error: "Ha ocurrido un error al procesar tu solicitud" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const { rows } = await pool.query(query, values);
    res.json("post eliminado con éxito");
    return rows;
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ha ocurrido un error al procesar tu solicitud" });
  }
});

app.listen(3000, () => {
  console.log("puerto en funcionamiento");
});
