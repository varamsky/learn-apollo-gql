import { pool } from "../../database/database.js";

export const salary = async (parent, args, contextValue, info) => {
  const { id } = parent;
  const [rows] = await pool.query(
    "SELECT salary, from_date as fromDate, to_date as toDate FROM salaries WHERE emp_no=?",
    id
  );
  return rows;
};
