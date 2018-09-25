
const configFile = require('./modules/klarna/plugins/config/klarnaConf');

const manifest = {
  server: {
    port: configFile.port,
    routes: {
      timeout: {
        server: 60000 * 3000,
        socket: 60000 * 4000
      },
      cors: {
        origin: ['*']
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: './good'
      },

      {
        plugin: './seneca'
      },
      {
        plugin: './klarna'
      }
    ],
    options: {
      once: true
    }
  }
};

module.exports = manifest;
