// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// const typeDefs = gql``;

const typeDefs = gql`
  
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    books: [Book]
    user(username: String!): User
    savedBooks(username: String): [Book]
  }  

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: String!): Auth
    removeBook(bookId: String!): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;