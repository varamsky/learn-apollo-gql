import { typeDefs as scalarTypeDefs } from "graphql-scalars";
export const typeDefs = [
  ...scalarTypeDefs,
  `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  interface Person{
    id: ID!
  }
  type Employee implements Person{
    id: ID! # now Employee must implement the id property of interface Person
     first_name: String!
     last_name: String! @deprecated(reason: "Use field - newField instead")
     gender(shortForm: Boolean = true): Gender!
     title: Title
     salary: [Salary!]
     }
     type Salary{
      salary: Int
      fromDate: Date
      toDate: Date
     }
     type Title{
      title: String!
     }
     enum Gender {
      M
      F
      Male
      Female
     }
     input EmployeeInput {
      first_name: String!
      last_name: String!
      gender: Gender!
    }
     type Query {
       allEmployees(limit: Int): [Employee!]
       employee(id: ID = 10011): Employee
     }
     type Mutation {
      addEmployee(input: EmployeeInput!): Employee
    }
`,
];
