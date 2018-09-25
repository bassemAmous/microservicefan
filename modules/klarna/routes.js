const clasification = require('./handlers/classification/clasification');
const train = require('./handlers/train/train');
// API server endpoints
exports.endPoints = [
  { method: 'POST', path: '/classify', config: clasification.display },
  { method: 'POST', path: '/train', config: train.display },
];
