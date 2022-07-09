const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: {
    index: "./src/index",
  },
  output: {
    publicPath: "auto",
    // assetModuleFilename: 'images/[hash][ext][query]'
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      // remotes: {
      //   cat: `cat@${getCatRemoteEntryURL()}`,
      //   dog: `dog@${getDogRemoteEntryURL()}`
      // },
      exposes: {
        './HomePage': './src/HomePage'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devtool = "eval-cheap-module-source-map";
  config.devServer = {
    port: 9001,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  };
}

// function getCatRemoteEntryURL() {
//   if (isProd) return "https://d2yt125o7sij9g.cloudfront.net/cat/remoteEntry.js"
//   return "http://localhost:9002/remoteEntry.js"
// }
//
// function getDogRemoteEntryURL() {
//   if (isProd) return "https://d2yt125o7sij9g.cloudfront.net/dog/remoteEntry.js"
//   return "http://localhost:9003/remoteEntry.js"
// }

module.exports = config;
