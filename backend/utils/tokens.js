const jwt = require("jsonwebtoken");
const config = require("./config");

const getToken = (usuario) => {
  return jwt.sign({ id: usuario._id }, config.secret, {
    expiresIn: config.jwtExpiresTime,
  });
};

const validToken = (token) => {
  try {
    const tokenDecoded = jwt.verify(token, config.secret);
    return tokenDecoded;
  } catch {
    return false;
  }
};

module.exports = { getToken, validToken };
