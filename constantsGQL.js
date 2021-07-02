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

const LOGIN = gql`
mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
        token
        email
        role
    }
}
`;

const CREATE_PRODUCT = gql`
mutation($name: String, $sku: String, $quantity: Int, $price: Float) {
    addProduct(input: { name: $name, sku: $sku, quantity: $quantity, price: $price }) {
        _id
        name
        sku
        quantity
        price
    }
}
`;

const ADD_SHOPPING_CART = gql`
mutation($productId: ID!, $quantity: Int) {
    addShoppingCart(input: { productId: $productId, quantity: $quantity }) {
        _id
        productId {
            _id
        }
        customerId {
            _id
        }
        quantity
    }
}
`;

const MY_SHOPPING_CART = gql`
query {
    myShoppingCart {
        _id
        productId {
            _id
            name
            sku
            price
            quantity
        }
        customerId {
            _id
            name
        }
        quantity
    }
}
`;

const DELETE_SHOPPING_CART = gql`
mutation($id: ID!) {
    removeById(id: $id)
}
`;

export {
    CREATE_ACCOUNT,
    PRODUCTS,
    LOGIN,
    CREATE_PRODUCT,
    ADD_SHOPPING_CART,
    MY_SHOPPING_CART,
    DELETE_SHOPPING_CART
}
