const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const connectDB = async () => { require('./config/db')(); };
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
    const app = express();
    
    const connectDB = require('./config/db');
    await connectDB();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`);
    })
};

startServer();