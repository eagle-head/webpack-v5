const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env, argv) {
  return {
    entry: {
      bundle: "./src/index.js",
    },

    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].js",
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new Dotenv({ path: "./.env.dev" }),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new HtmlWebpackPlugin({
        title: "Webpack v5",
        template: "./public/index.ejs",
      }),
      new CopyPlugin({
        patterns: [{ from: "./public/robots.txt", to: "./" }],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          loader: "babel-loader",
        },
      ],
    },

    devtool: "eval",

    devServer: {
      contentBase: path.join(__dirname, "build"),
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
      overlay: {
        warnings: true,
        errors: true,
      },
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      // stats: "verbose",
      watchOptions: {
        ignored: /node_modules/,
      },
    },
  };
};
