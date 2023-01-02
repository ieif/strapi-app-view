import * as apollos from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

function getM(m: any) {
   return m.default ? m.default : m;
}
const apollo = getM(apollos);

// HTTP connection to the API
/* const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_STRAPI_API_URL + "/graphql" || "http://localhost:80/graphql"
});
 */
// Cache implementation
const cache = new apollo.InMemoryCache();

// Create the apollo client
const apolloClient = new apollo.ApolloClient({
   uri: `http://localhost/graphql` || "http://localhost:80/graphql",
   cache,
});

//export default apolloClient;

export const provider = createApolloProvider({
   defaultClient: apolloClient,
});
