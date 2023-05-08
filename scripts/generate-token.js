#!/usr/bin/env node

const { v4: createUuid } = require('uuid');

const jwt = require('jsonwebtoken');
const id = createUuid();

const token = jwt.sign(
  {
    id,
    apiKey: process.env.API_KEY,
    allowedAudioOrigins:
      'https://soundws-mixthat-prd-storage.s3.us-east-1.amazonaws.com,https://d2m8h53em6mi65.cloudfront.net/default/drumsv2',
    sub: process.env.JWT_SUB || 'https://www.mixthat.co',
  },
  process.env.SWS_SECRET,
  {
    // expiresIn: 3600,
    audience: 'api.sound.ws',
  }
);

console.log(token);
