import { allEmployees, employee, addEmployee } from "./employees.js";
import { title } from "./titles.js";
import { gender } from "./gender.js";
import { salary } from "./salary.js";

export const queryResolvers = {
  Query: {
    allEmployees,
    employee,
  },
  Mutation: {
    addEmployee,
  },
  Employee: {
    title: title,
    gender: gender,
    salary: salary,
  },
};
