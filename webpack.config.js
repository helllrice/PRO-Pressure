const path = require('path');

module.exports = {
  mode: 'development',
  entry: './#src/js/script.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
