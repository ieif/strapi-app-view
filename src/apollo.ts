//import { createHttpLink } from "apollo-link-http";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

// HTTP connection to the API
/* const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_STRAPI_API_URL + "/graphql" || "http://localhost:80/graphql"
});
 */
// Cache implementation
const cache = new InMemoryCache();
 
// Create the apollo client
const apolloClient = new ApolloClient({
   uri: `http://localhost/graphql` || "http://localhost:80/graphql",
   cache,
});

export default apolloClient;

export const provider = createApolloProvider({
   defaultClient: apolloClient,
});
