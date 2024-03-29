import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { queryResolvers as resolvers } from "../graphql/resolvers/index.js";
import { typeDefs } from "../graphql/schema.js";
import { runSetup } from "./setup.js";
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

describe("Employees Test", () => {
  beforeAll(async () => {
    await runSetup();
  });

  it("get all employees", async () => {
    const employees = await server.executeOperation({
      query: `
      query getEmployees($limit: Int, $includeSalary: Boolean!) {
        allEmployees(limit: $limit) {
          id
          first_name
          last_name
          gender
          title{
            title
          }
          salary @include(if: $includeSalary) {
            salary
            fromDate
            toDate
          }
        }
      }
      `,
      variables: {
        limit: 100,
        includeSalary: false,
      },
    });
    expect(employees.body.singleResult.data.allEmployees.length).toBe(10);
  });

  it("get an employee by id", async () => {
    const employee = await server.executeOperation({
      query: `
      query getEmployee($employeeId: ID, $shortForm: Boolean){
        employee(id: $employeeId) {
          id
          first_name
          last_name
          gender(shortForm: $shortForm)
          title {
            title
          }
          salary {
            salary
            fromDate
            toDate
          }
        }
      }
      `,
      variables: { employeeId: 10001, shortFrom: false },
    });
    expect(employee.body.singleResult.data.employee.id).toBe("10001");
  });
});
