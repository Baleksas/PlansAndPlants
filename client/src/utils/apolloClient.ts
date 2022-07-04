import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";


const errorLink = onError(({ graphQLErrors, networkError }) => {

    if (graphQLErrors) {      
      graphQLErrors.map((message, location, path) => {
        console.log(`Graphql error: ${JSON.stringify(message)}`);
      });
    }
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:8001/graphql" }),
  ]);

  export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });