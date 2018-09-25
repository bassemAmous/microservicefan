

const seneca = require('seneca')(); // eslint-disable-line

const klarnaServices = require('../plugins/service-registration');


// start seneca services
seneca.use(klarnaServices.services);


// function to use seneca
exports.asyncAct = function asyncActCallForSeneca(pattern) {
  return new Promise((resolve, reject) => {
    seneca.act(pattern, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
