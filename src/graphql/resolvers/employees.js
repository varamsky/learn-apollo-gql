import { pool } from "../../database/database.js";

export const allEmployees = async (parent, args) => {
  const { limit } = args;
  const [rows] = await pool.query(
    "Select emp_no as id, first_name, last_name, gender from employees limit ?",
    limit ?? 10
  );
  return rows;
};

export const employee = async (parent, args, contextValue, info) => {
  // console.log(`parent = ${JSON.stringify(parent)}`);
  // console.log(`args = ${JSON.stringify(args)}`);
  // console.log(`contextValue = ${JSON.stringify(contextValue)}`);
  // console.log(`info = ${JSON.stringify(info)}`);
  const { id } = args;
  const [rows] = await pool.query(
    "SELECT emp_no as id, first_name, last_name, gender FROM employees WHERE emp_no=?",
    id
  );
  return rows[0];
};

export const addEmployee = async (parent, args) => {
  const { first_name, last_name, gender } = args.input;
  console.log(`args = ${JSON.stringify(args)}`);
  const [rows] = await pool.query(
    "SELECT count(emp_no) as count FROM employees"
  );
  const count = rows[0].count;
  const insertId = count + 1;
  try {
    const [result] = await pool.query(
      "INSERT INTO employees(emp_no, first_name, last_name, gender, birth_date, hire_date) VALUES (?,?,?,?, CURDATE(), CURDATE())",
      [insertId, first_name, last_name, gender]
    );
    console.log(`result = ${JSON.stringify(result)}`);
    const [rows] = await pool.query(
      "SELECT emp_no as id, first_name, last_name, gender FROM employees WHERE emp_no=?",
      insertId
    );
    return rows[0];
  } catch (ex) {
    console.error(`Unexpected exception : ${JSON.stringify(ex)}`);
  }
};
