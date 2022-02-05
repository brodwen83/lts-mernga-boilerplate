const { UserInputError } = require('apollo-server-express');
const User = require('../../../models/User');

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require('../../../utils/auth');
const {
  ErrorMessages,
  SuccessMessages,
  UserInputValidationErrors,
} = require('../../../utils/messages');

const isEmpty = require('../../../utils/isEmpty');

module.exports = async (_, { usernameOrEmail, password }, context) => {
  if (isEmpty(usernameOrEmail)) {
    throw new Error(`username or email ${UserInputValidationErrors.IS_EMPTY}`);
  }

  if (isEmpty(password)) {
    throw new Error(`password ${UserInputValidationErrors.IS_EMPTY}`);
  }

  const userExists = await User.findOne({
    $or: [
      { name: usernameOrEmail },
      { email: usernameOrEmail },
      { activeName: usernameOrEmail },
    ],
  })
    .select('+password')
    .populate('parent ancestors');

  if (!userExists) throw new UserInputError(ErrorMessages.USER_NOT_FOUND);

  if (!userExists.verified) {
    throw new Error(ErrorMessages.VERIFIY_YOUR_EMAIL);
  }

  if (!userExists.approved) {
    throw new Error(ErrorMessages.ACCOUNT_WAITING_FOR_APPROVAL);
  }

  const isMatch = await userExists.comparePassword(password);
  if (!isMatch) throw new UserInputError(ErrorMessages.INVALID_PASSWORD);

  const token = createAccessToken(userExists);
  sendRefreshToken(context.res, createRefreshToken(userExists));

  return {
    code: 200,
    success: true,
    message: SuccessMessages.SIGNIN_SUCCESS,
    user: userExists,
    token,
  };
};
