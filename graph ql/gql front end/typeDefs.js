const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    price: Int!
    category: String!
  }

  type Query {
    products(category: String): [Product!]!
    product(id: ID!): Product
    totalProducts: Int!
  }

  type Mutation {
    addProduct(title: String!, price: Int!, category: String!): Product!
    updateProductPrice(id: ID!, price: Int!): Product
    deleteProduct(id: ID!): String!
  }
`;

module.exports = typeDefs;