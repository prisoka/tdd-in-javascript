const nodeExternals = require('webpack-node-externals');
const path = require('path');
process.env.NODE_ENV = 'TEST';

module.exports = {
  target: 'node',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~/testhelpers': path.resolve(__dirname, 'test/helpers'),
      '~testhelpers': path.resolve(__dirname, 'test/helpers'),
      '~apiSpecs': path.resolve(__dirname, 'test/apiSpecs'),
      '~/apiSpecs': path.resolve(__dirname, 'test/apiSpecs'),
      '~/config': path.resolve(__dirname, 'web/config/index')
    }
  },
  devtool: 'cheap-module-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            }
          },
          {
            loader: 'eslint-loader'
          }
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  }
};
