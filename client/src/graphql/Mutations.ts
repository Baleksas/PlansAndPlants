import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $description: String!
    $price: Float!
    $date: String!
  ) {
    createEvent(
      eventInput: {
        title: $title
        description: $description
        price: $price
        date: $date
      }
    ) {
      _id
      title
      creator {
        email
      }
    }
  }
`;
