const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    age: Int!
    course: String!
  }

  type Query {
    student(id: ID!): Student
    allStudents: [Student!]!
  }
`;

const studentsData = [
  { id: "1", name: "Vipin Sohal", age: 21, course: "Advanced Web Technologies" },
  { id: "2", name: "Jane Doe", age: 22, course: "Computer Science Engineering" }
];

const resolvers = {
  Query: {
    student: (_, { id }) => studentsData.find(student => student.id === id),
    allStudents: () => studentsData,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`GraphQL Server ready at: ${url}`);
}

startServer();