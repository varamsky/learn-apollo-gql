import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./src/apollo/executableSchema.js";

import { queryResolvers as resolvers } from "./src/graphql/resolvers/index.js";
import { typeDefs } from "./src/graphql/schema.js";

// server setup
// const server = new ApolloServer({
//   schema,
//   //   typeDefs,
//   //   resolvers,
// });

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
