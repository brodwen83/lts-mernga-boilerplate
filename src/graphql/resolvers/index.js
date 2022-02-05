/* eslint-disable no-unused-vars */

const defaultResolvers = require('./default');
const userResolvers = require('./userResolvers');

module.exports = {
  Query: {
    ...defaultResolvers.Query,
    ...userResolvers.Query,
  },

  Mutation: {
    ...defaultResolvers.Mutation,
    ...userResolvers.Mutation,
  },

  MutationResponse: {
    // eslint-disable-next-line no-unused-vars
    __resolveType(mutationResponse, context, info) {
      return null;
    },
  },
};
