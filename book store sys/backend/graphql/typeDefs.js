const typeDefs = `#graphql
    type Author {
        id: ID!
        name: String!
        age: Int
    }

    type Book {
        id: ID!
        title: String!
        genre: String
        author: Author
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        searchBooks(title: String!): [Book]
    }

    type Mutation {
        addAuthor(name: String!, age: Int): Author
        addBook(title: String!, genre: String!, authorId: ID!): Book
        updateBook(id: ID!, title: String, genre: String, authorId: ID): Book
        deleteBook(id: ID!): Book
    }
`;

module.exports = typeDefs;