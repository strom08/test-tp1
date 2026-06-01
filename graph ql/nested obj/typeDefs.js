const { gql } = require('apollo-server');

const typeDefs = gql`
  type Course {
    courseName: String!
    duration: String!
  }

  type User {
    name: String!
    age: Int!
    enrolledCourse: Course!
  }

  type Query {
    getUser: User
  }
`;

module.exports = typeDefs;