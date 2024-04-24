import { pool } from "../database/connection.js";

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM posts;");
  return rows;
};

const create = async (titulo, url, descripcion) => {
  const query =
    "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5);";
  const id = Math.floor(Math.random() * 9999);
  const values = [id, titulo, url, descripcion, 0];
  const { rows } = pool.query(query, values);
  return rows;
};

export const todoModel = { findAll, create };
