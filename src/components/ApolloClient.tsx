import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;