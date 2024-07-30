import { gql } from '@apollo/client';

export const authenticateEmail = gql`
  query authenticateEmail($options: PageQueryOptions!) {
    users(options: $options) {
      data {
        email
      }
    }
  }
`;
