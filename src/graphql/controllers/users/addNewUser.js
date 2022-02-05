/* eslint-disable prefer-template */
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-express');

// const transporter = require('../../../config/transporter');

const User = require('../../../models/User');
const { buildAncestors } = require('./helpers');

const { ErrorMessages, SuccessMessages } = require('../../../utils/messages');

const addNewUser = async (
  _,
  { fullName, username, email, password },
  { currentUser },
) => {
  const userExists = await User.findOne({
    $or: [
      { fullName },
      { email },
      { username: new RegExp('^' + username + '$', 'i') },
    ],
  });

  if (userExists) {
    throw new UserInputError(ErrorMessages.USER_ALREADY_EXISTS);
  }

  const newUser = new User({
    fullName,
    email,
    username,
    password,
    parent: currentUser ? await User.findOne({ _id: currentUser.id }) : null,
  });

  try {
    const user = await newUser.save();

    if (currentUser) {
      await buildAncestors(user._id, currentUser.id);
    }

    let token = null;

    token = jwt.sign(
      {
        email: user.email,
      },
      process.env.EMAIL_SECRET,
      { expiresIn: '30d' },
      (err, mailToken) => {
        // const url = `http://localhost:5000/api/v1/confirmation/${mailToken}`;
        token = mailToken;

        // transporter.sendMail({
        //   from: 'Weight Loss Coaching Works <admin@wlcw.com.au>',
        //   to: email,
        //   subject: 'Verify Email',
        //   text: `
        //   Hi ${fullName},

        //   Welcome to Weight Loss Coaching Works and great to connect with you!

        //   Please verify your email.
        //   ${url}

        //   All the Best,
        //   Ben Physick
        //   `,
        //   html: `
        //   <p>Hi ${fullName},</p>
        //   <br /><p>Welcome to Weight Loss Coaching Works and great to connect with you!

        //   <br />Please verify your email.
        //   <br/><br /><a target="_blank" rel="noopener noreferrer" href="${url}"> Verify</a>

        //   <br />
        //   <br />
        //   </p>
        //   <p>All the Best,</p>
        //   <p>Ben Physick</p>
        //   </p>`,
        // });
      },
    );

    return {
      code: '200',
      success: true,
      message: SuccessMessages.ADD_USER_SUCCESS,
      user,
      token,
    };
  } catch (error) {
    console.error(error);
    let status = '500';
    if (error.message === ErrorMessages.USER_ALREADY_EXISTS) status = '400';

    return {
      code: status,
      success: false,
      message: `${ErrorMessages.ADD_USER_FAILED}, ${error.message}`,
      user: null,
      token: '',
    };
  }
};

module.exports = addNewUser;
