require("dotenv").config();

const {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  gql,
  concat,
} = require("@apollo/client");
const { fetch } = require("cross-fetch");
const httpLink = new HttpLink({
  uri: "http://localhost:" + process.env.APP_PORT,
  fetch,
});

// const getAuthMiddleware = (token) => {
//     //console.log('token: ' + token);
//     return new ApolloLink((operation, forward) => {
//         operation.setContext(({ headers = {} }) => ({
//             headers: {
//                 ...headers,
//                 authorization: (token) ? `Bearer ${token}` : null,
//                 'xavroclientid': process.env.TEST_CLIENT_ID
//             }
//         }));
//         return forward(operation);
//     })
// }

// disable caching
const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutation: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const getClient = (token) => {
  // const authMiddleware = getAuthMiddleware(token);
  return new ApolloClient({
    cache: new InMemoryCache(),
    // link: concat(authMiddleware, httpLink),
    link: httpLink,
    defaultOptions: defaultOptions,
    onError: (e) => {
      console.log(e);
    },
  });
};

const client = getClient();

module.exports = {
  client,
  getClient,
};
