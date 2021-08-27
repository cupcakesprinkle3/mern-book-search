// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// const typeDefs = gql``;

const typeDefs = gql`
  
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
  
  }

  type Auth {
    token: ID!
    user: User
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