const {
  Given, Then, When,
} = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
const { env, tokenGenerator } = require('../../Functions');
const { api, client } = require('../../Routers');
require('../../index.js');

axios.defaults.headers.common.Authorization = `Bearer ${tokenGenerator()}`;
axios.defaults.baseURL = 'http://127.0.0.1:3000';

Given('I have access to Knock Off Reddit', () => true);

When('I ping Knock Off Reddit', () => {
  axios('/ping');
});

Then('I receive a pong', async () => {
  console.log(`${(await axios('/ping'))}`);
});
