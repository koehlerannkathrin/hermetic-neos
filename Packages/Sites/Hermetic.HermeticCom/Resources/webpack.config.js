const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: {
    vendor: './Private/Scripts/vendor.js',
    application: [
      './Private/Scripts/application.js',
      './Private/Stylesheets/styles.scss'
    ]
  },
  output: {
    filename: 'Scripts/[name].js',
    path: path.resolve(__dirname, 'Public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                browsers: ["last 2 versions", "safari >= 7"]
              }]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }

          ]
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('Stylesheets/styles.css'),
    new LiveReloadPlugin({
      ignore: /\.(js|map)$/
    })
  ],
  devtool: 'source-map'
}
