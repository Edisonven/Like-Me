import express from "express";
import cors from "cors";
import { pool } from "../database/connection.js";
import { postModel } from "../models/model.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.findAll();
    res.json(posts);
    console.log("mostrando todos los posts");
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
    const posts = await postModel.create(titulo, url, descripcion);
    res.json(posts);
  } catch (error) {
    console.log("ha ocurrido un error al postear");
    res.status(400).json({ message: "error al procesar la operación " });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = postModel.update(id);
    res.json(posts);
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
    const posts = postModel.remove(id);
    res.json(posts);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ha ocurrido un error al procesar tu solicitud" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
