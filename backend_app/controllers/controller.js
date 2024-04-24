import { postModel } from "../models/model.js";

const read = async (req, res) => {
  try {
    const posts = await postModel.findAll();
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    if (!titulo || !url || !descripcion) {
      console.log("No pueden haber campos vacíos");
      return;
    }
    const posts = await postModel.create(titulo, url, descripcion);
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postModel.update(id);
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postModel.remove(id);
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postController = { read, create, update, remove };
