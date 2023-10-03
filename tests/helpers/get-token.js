const jsonwebtoken = require("jsonwebtoken");

module.exports = () => {
  return jsonwebtoken.sign(
    {
      id: "uuid",
      apiKey: process.env.API_KEY,
      sub: "test123",
    },
    process.env.SWS_SECRET,
    {
      audience: "stemplayer-js-api",
    }
  );
};
