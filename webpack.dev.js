const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env, argv) {
  return {
    context: path.resolve(__dirname, "./"),

    entry: path.resolve(__dirname, "src", "index.js"),

    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "[name]~[contenthash:10].js",
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new HtmlWebpackPlugin({
        title: "Webpack v5",
        template: "./public/index.ejs",
      }),
      // new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
      ],
    },

    devtool: "eval-source-map",

    devServer: {
      port: process.env.DB_PORT,
      contentBase: path.join(__dirname, "build"),
      // hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
      watchContentBase: true,
    },
  };
};

// const path = require("path");
// const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = function (env, argv) {
//   return {
//     entry: {
//       bundle: "./src/index.js",
//     },

//     output: {
//       path: path.resolve(__dirname, "build"),
//       filename: "[name].js",
//     },

//     plugins: [
//       new webpack.ProgressPlugin(),
//       new Dotenv({ path: "./.env.dev" }),
//       new webpack.AutomaticPrefetchPlugin(),
//       new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
//       new HtmlWebpackPlugin({
//         title: "Webpack v5",
//         template: "./public/index.ejs",
//       }),
//       new webpack.HotModuleReplacementPlugin(),
//     ],

//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           include: path.resolve(__dirname, "src"),
//           loader: "babel-loader",
//         },
//       ],
//     },

//     devtool: "eval",

//     devServer: {
//       contentBase: path.join(__dirname, "build"),
//       compress: true,
//       historyApiFallback: true,
//       hot: true,
//       watchContentBase: true,
//       open: true,
//       overlay: true,
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       watchOptions: {
//         ignored: /node_modules/,
//       },
//     },
//   };
// };
