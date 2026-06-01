const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    city: String!
    queries: [SupportQuery!]!
  }

  type SupportQuery {
    id: ID!
    title: String!
  }

  type UserQueryCount {
    name: String!
    totalQueries: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    queries: [SupportQuery!]!
    usersByCity(city: String!): [User!]!
    totalUsers: Int!
    totalQueries: Int!
    searchUser(name: String!): [User!]!
    usersWithQueryCount: [UserQueryCount!]!
  }

  type Mutation {
    addUser(name: String!, email: String!, city: String!): User!
    addSupportQuery(id: ID!, title: String!): SupportQuery!
    updateUserCity(id: ID!, city: String!): User
    updateUserEmail(id: ID!, email: String!): User
    deleteUser(id: ID!): String!
    deleteSupportQuery(id: ID!, title: String!): String!
  }
`;

module.exports = typeDefs;