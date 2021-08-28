import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      username 
    }
      savedBooks {
        _id
        name
        visibility
        members
        username
      }
  }
`;