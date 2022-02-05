const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const checkAuth = async ({ req }) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        return user;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new AuthenticationError('Invalid / Expired token');
      }
    }
    return null;
    // throw new Error("Authentication token must be 'Bearer [token]'");
  }
  return null;
  // throw new Error('Authorization header must be provided');
};

module.exports = checkAuth;
