const jwt = require('jsonwebtoken');

const WEEK_IN_MS = parseInt('604800000‬', 10);
const MINUTES15 = 900000;

exports.createAccessToken = ({
  id,
  slug,
  name,
  activeName,
  email,
  tokenVersion,
  role,
  rank,
  parent,
}) =>
  jwt.sign(
    { id, slug, name, activeName, email, tokenVersion, role, rank, parent },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );

exports.createRefreshToken = ({
  id,
  slug,
  name,
  activeName,
  email,
  tokenVersion,
  role,
  rank,
  parent,
}) =>
  jwt.sign(
    { id, slug, name, activeName, email, tokenVersion, role, rank, parent },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );

exports.sendRefreshToken = (res, token) => {
  res.cookie('jrt', token, {
    expires: new Date(Date.now() + WEEK_IN_MS),
    httpOnly: true,
  });
};

exports.sendAccessToken = (res, token) => {
  res.cookie('jat', token, {
    expires: new Date(Date.now() + MINUTES15),
    httpOnly: true,
  });
};
