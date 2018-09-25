const chairo = require('chairo');
const pjson = require('./package.json');

module.exports = {
  pkg: pjson,
  async register(server) {
    await server.register([
      {
        plugin: chairo,
      }
    ]);
  }
};
