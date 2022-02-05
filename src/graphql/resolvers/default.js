module.exports = {
  Query: {
    hello: (_, { name }) => `Hello, ${name}`,
  },

  Mutation: {
    byebye: () => true,
  },
};
