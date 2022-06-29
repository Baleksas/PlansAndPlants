import {  gql } from '@apollo/client';
export const GET_EVENTS = gql`
query {
    events {
      _id
    }
  }
`;

export const LOGIN=gql`
query login(
  $email:String!
  $password:String!
  ){
    login(email:$email, password: $password){
      userId
      token
      tokenExpires
    }
  }
  `;

