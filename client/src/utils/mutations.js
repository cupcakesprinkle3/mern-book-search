import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {               
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

// export const SAVE_BOOK = gql`
// mutation updateBook($bookId: ID, $book: BookInfo!) {
//   updateBook(bookId: $bookId, book: $book) {
//     _id
//     name
//     username
//   }
// }
// `;

export const SAVE_BOOK = gql`
    mutation saveBook($bookToSave: BookToSave!) {
    saveBook (bookToSave: $bookToSave)
        {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
      email
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
    }
  }
}
`;