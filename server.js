const Glue = require('glue');
const manifest = require('./manifest');
const path = require('path');

const options = {
  relativeTo: path.join(__dirname, 'modules')
};

const glue = async function guleServer() {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    server.log('info', `Server started at ${server.info.uri}`);
  } catch (err) {
    if (err) throw err;
    process.exit(1);
  }
};

exports.init = glue;
