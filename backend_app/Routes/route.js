import { postModel } from "../models/model.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/like/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;
