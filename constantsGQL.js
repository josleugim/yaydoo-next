import { gql } from "@apollo/client";

const CREATE_ACCOUNT = gql`
mutation($name: String!, $email: String!, $password: String!) {
    addVendor(input: { name: $name, email: $email, password: $password }) {
        _id
        name
        role
        email
    }
}
`;

export {
    CREATE_ACCOUNT
}
