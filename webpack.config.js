const path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      _: [
        path.resolve(__dirname, 'utilities')
      ]
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  target: 'node'
};
