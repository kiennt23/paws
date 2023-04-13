const path = require("path");
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
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
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
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app-shell',
      // remotes: {
      //   home: `home@${getHomeRemoteEntryURL()}`,
      //   cat: `cat@${getCatRemoteEntryURL()}`,
      //   dog: `dog@${getDogRemoteEntryURL()}`
      // },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // homeRemoteEntry: getHomeRemoteEntryURL()
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
    port: 9000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true
  };
}

// function getHomeRemoteEntryURL() {
//   if (isProd) return "https://d2yt125o7sij9g.cloudfront.net/home/remoteEntry.js"
//   return "http://localhost:9001/remoteEntry.js"
// }

// function getCatRemoteEntryURL() {
//   if (isProd) return "https://d2yt125o7sij9g.cloudfront.net/cat/remoteEntry.js"
//   return "http://localhost:9002/remoteEntry.js"
// }

// function getDogRemoteEntryURL() {
//   if (isProd) return "https://d2yt125o7sij9g.cloudfront.net/dog/remoteEntry.js"
//   return "http://localhost:9003/remoteEntry.js"
// }

module.exports = config;
