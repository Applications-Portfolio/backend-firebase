import {gql} from "apollo-server-express";

const schema = gql`
  type Query {
    readUsers: [User]
    readUser(phone: String!): User
  }

  type Mutation {
    createUser(phone: String!, name: String!, email: String!): User
    createAddress(
      userId: String!
      street: String!
      neighborhood: String!
      number: String!
      city: String!
      state: String!
      zipCode: String!
      complement: String
    ): Address
  }

  type User {
    phone: String!
    name: String!
    email: String!
    addresses: [Address]
  }

  type Address {
    userId: String!
    street: String!
    neighborhood: String!
    number: String!
    city: String!
    state: String!
    zipCode: String!
    complement: String
  }
`;

export default schema;
