const checkAuth = require('./checkAuth');

module.exports = async (resolve, parent, args, context, info) => {
  const currentUser = await checkAuth(context);
  context.currentUser = currentUser;

  const resolveUser = await resolve(parent, args, context, info);

  return resolveUser;
};
