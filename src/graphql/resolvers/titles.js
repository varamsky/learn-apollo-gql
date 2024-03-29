import { pool } from "../../database/database.js";

export const title = async (parent, args, contextValue, info) => {
  const { id } = parent;
  const [rows] = await pool.query(
    "SELECT title FROM titles WHERE emp_no=?",
    id
  );
  return rows[0];
};
