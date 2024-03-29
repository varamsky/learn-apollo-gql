import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { queryResolvers } from "../graphql/resolvers/index.js";
import { typeDefs } from "../graphql/schema.js";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    // ...scalarResolvers,
    ...queryResolvers,
  },
});
