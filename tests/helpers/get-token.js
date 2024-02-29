const jsonwebtoken = require("jsonwebtoken");

module.exports = () => {
  return jsonwebtoken.sign({}, process.env.SWS_SECRET, {
    expiresIn: 3600,
    audience: "stemplayer-js-api",
  });
};
