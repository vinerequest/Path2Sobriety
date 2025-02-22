const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_HASH_ALGORITHM': JSON.stringify('sha256'),
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  )
);