require('dotenv').config({});

const Raven = require('raven');

module.exports.Raven = Raven.config(process.env.RAVEN).install();
