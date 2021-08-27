const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ username: context.user.username })
                    .select('-__v -password')
                    .populate('books')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('books')
        },
        savedBooks: async (parent, { username, context }) => {
            if (context.user) {
                const params = username ? { username } : {};
            }
            return Book.find(params).sort({ createdAt: -1 });
        },
        bookCount: async ({ username, context }) => {
            if (context.user) {
                const bookData = await Book.countDocuments({ username });
            }
            return bookData;
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const savebook = await Book.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { books: book._id } },
                    { new: true }
                );
                return savebook;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const removedBook = await Book.findOneAndDelete({
                    _id: bookId,
                    username: context.user.username,
                });

                const updatedUser = removedBook
                    ? await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: bookId } },
                        { new: true }
                    ).populate('books')
                    : null;

                return updatedUser;
            }
        }
    }
}
module.exports = resolvers;