const ErrorMessages = {
  USER_ALREADY_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_TAKEN: 'Email already taken.',
  VERIFIY_YOUR_EMAIL: 'Please verify your email.',
  ACCOUNT_WAITING_FOR_APPROVAL: 'Account currently waiting for approval',
  INVALID_PASSWORD: 'Invalid Password.',
  ADD_USER_FAILED: 'Add user failed',
};

const UserInputValidationErrors = {
  IS_EMPTY: ' is empty.',
};

const SuccessMessages = {
  SIGNIN_SUCCESS: 'Signin successful.',
  ADD_USER_SUCCESS: 'New user added successfully.',
};

module.exports = {
  UserInputValidationErrors,
  ErrorMessages,
  SuccessMessages,
};
