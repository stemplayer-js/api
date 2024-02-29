#!/usr/bin/env node
const jwt = require("jsonwebtoken");

const token = jwt.sign({}, process.env.SWS_SECRET, {
  expiresIn: 3600,
  audience: "stemplayer-js-api",
});

console.log(token);
