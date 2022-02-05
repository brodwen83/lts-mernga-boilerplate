const User = require('../../models/User');
const { signIn, addNewUser } = require('../controllers/users');

module.exports = {
  Query: {
    users: () => User.find(),

    bye: async (_, __, { currentUser = {} }) => `Bye ${currentUser.username}`,

    me: async (_, __, { currentUser = {} }) => {
      if (currentUser) {
        try {
          const userExists = await User.findById(currentUser.id);
          if (!userExists.verified) {
            return null;
          }

          return userExists;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      return null;
    },
  },

  Mutation: {
    signIn,
    addNewUser,
  },
};
