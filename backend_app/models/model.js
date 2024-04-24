import { pool } from "../database/connection.js";

const findAll = async () => {
  const query = "SELECT * FROM posts;";
  const { rows } = await pool.query(query);
  return rows;
};

const create = async (titulo, url, descripcion) => {
  const query =
    "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
  const id = Math.floor(Math.random() * 9999);
  const values = [id, titulo, url, descripcion, 0];
  const { rows } = await pool.query(query, values);
  return rows;
};

const update = async (id) => {
  const likesQuery = "SELECT likes FROM posts WHERE id = $1";
  const result = await pool.query(likesQuery, [id]);
  const likesValue = result.rows[0].likes;
  const currentLikesValue = likesValue + 1;
  const query = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *";
  const values = [currentLikesValue, id];
  const { rows } = await pool.query(query, values);
  return rows;
};

const remove = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows;
};

export const postModel = { findAll, create, update, remove };
