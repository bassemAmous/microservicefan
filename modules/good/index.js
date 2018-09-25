const pjson = require('./package.json');
const good = require('good');

module.exports = {
  pkg: pjson,
  async register(server) {
    await server.register([
      {
        plugin: good,
        options: {
          ops: {
            interval: 60000
          },
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                  error: '*', log: '*', ops: '*', request: '*', response: '*'
                }]
              },
              {
                module: 'good-console',
                args: [
                  {
                    format: 'L LTS',
                    color: true
                  }
                ]
              },
              'stdout'
            ]
          }
        }
      }
    ]);
  }
};
