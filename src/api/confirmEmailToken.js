const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    const { email } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    await User.findOneAndUpdate(
      { email },
      { $set: { verified: true, status: 'Verified', approved: true } },
    );
  } catch (error) {
    console.error(error);
    res.send(error);
  }

  const loginURL =
    process.env.NODE_ENV === 'production'
      ? `${process.env.PROD_DOMAIN}#/login`
      : `${process.env.LOCAL_DEVELOPMENT_DOMAIN}#/login`;

  return res.redirect(loginURL);
};
