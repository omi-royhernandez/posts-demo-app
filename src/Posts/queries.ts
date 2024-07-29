import { gql } from '@apollo/client';

export const getPosts = gql`
  query GetAllPost($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          name
          company {
            name
          }
        }
        comments {
          data {
            id
            email
            body
          }
        }
      }
    }
  }
`;
