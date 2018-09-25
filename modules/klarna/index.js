

const Routes = require('./routes');


module.exports = {
  pkg: require('./package.json'), // eslint-disable-line
  async register(server) { // eslint-disable-line

    server.route(Routes.endPoints);
  }
};
