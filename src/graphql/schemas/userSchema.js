const { gql } = require('apollo-server-express');

const userSchemaType = gql`
  type User {
    id: ID
    username: String
    fullName: String
    password: String
    email: String
    role: String
    rank: String
    joinDate: String
    tokenVersion: Int
    verified: Boolean
    approved: Boolean
    parent: User
    ancestors: [User]
  }
`;

module.exports = userSchemaType;
