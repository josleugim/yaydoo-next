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

const PRODUCTS = gql`
query($name: String, $sku: String, $minPrice: Int, $maxPrice: Int, $vendorId: ID) {
    products(filters: { name: $name, sku: $sku, minPrice: $minPrice, maxPrice: $maxPrice, vendorId: $vendorId }) {
        _id
        name
        sku
        quantity
        price
        vendor {
            name
        }
    }
}`;

export {
    CREATE_ACCOUNT,
    PRODUCTS
}
