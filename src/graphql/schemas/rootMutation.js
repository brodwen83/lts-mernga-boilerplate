const { gql } = require('apollo-server-express');

module.exports = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  # User
  type AuthResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type Mutation {
    byebye: Boolean!

    # User
    signIn(usernameOrEmail: String!, password: String!): AuthResponse
    addNewUser(
      fullName: String!
      email: String!
      username: String!
      password: String!
    ): AuthResponse
  }
`;
