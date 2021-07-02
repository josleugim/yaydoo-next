import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "@apollo/client/link/error";
import {AUTH_TOKEN} from "./constants";

const httpLink = createHttpLink({
    uri: 'http://localhost:8081/graphql'
});

const authLink = setContext((_, { headers }) => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYwZGIyYWQ5NWJlZWJkMmM1NDk1NzM2NCIsInJvbGUiOiJ2ZW5kb3IifSwiaWF0IjoxNjI1MTY4OTMzLCJleHAiOjE2MjUyNTUzMzN9.0aA8yCt9Va3MK6aNWK2q2qwkbWQDQIvVqaoVElbZV8s';
    if (typeof window !== 'undefined') {
        token = sessionStorage.getItem(AUTH_TOKEN);
    }

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
