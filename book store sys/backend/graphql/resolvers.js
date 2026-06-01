const Book = require('../models/Book');
const Author = require('../models/Author');

const resolvers = {
    Query: {
        books: async () => await Book.find(),
        book: async (_, { id }) => await Book.findById(id),
        authors: async () => await Author.find(),
        searchBooks: async (_, { title }) => {
            return await Book.find({ title: { $regex: title, $options: 'i' } });
        }
    },
    Book: {
        author: async (parent) => await Author.findById(parent.authorId)
    },
    Mutation: {
        addAuthor: async (_, { name, age }) => {
            const author = new Author({ name, age });
            return await author.save();
        },
        addBook: async (_, { title, genre, authorId }) => {
            const book = new Book({ title, genre, authorId });
            return await book.save();
        },
        updateBook: async (_, { id, title, genre, authorId }) => {
            return await Book.findByIdAndUpdate(
                id,
                { $set: { title, genre, authorId } },
                { new: true }
            );
        },
        deleteBook: async (_, { id }) => {
            return await Book.findByIdAndDelete(id);
        }
    }
};

module.exports = resolvers;