import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: 'http://localhost:8081/graphql'
});

const authLink = setContext((_, { headers }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYwZGFhODc5OWZkMmU5MjEwNDE4NmFlOSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2MjUwOTk5MTYsImV4cCI6MTYyNTE4NjMxNn0.NM_MZPL7NqxgNgGXGvQojDjLgs7qWDQAwIVpUuaPbzM';
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ''
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('---', graphQLErrors, '---');
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            return console.log(
                `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
            )
        });
        // sessionStorage.removeItem(AUTH_TOKEN);
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
});

const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache()
});

export default client;
