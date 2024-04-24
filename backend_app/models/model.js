import { pool } from "../database/connection.js";

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM posts;");
  return rows;
};

const create = async ()=>{

}

export const todoModel = { findAll };
