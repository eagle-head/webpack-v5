const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = function (env, argv) {
  return {
    entry: {
      bundle: "./src/index.js",
    },

    output: {
      path: path.resolve(__dirname, "build"),
      filename: "static/js/[name]~[contenthash:10].js",
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new Dotenv({ path: "./.env.prod" }),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new webpack.SourceMapDevToolPlugin({
        filename: "static/js/[name].js.map",
        exclude: "vendor.js",
      }),
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

    optimization: {
      runtimeChunk: "single",
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: 4,
          terserOptions: {
            output: {
              comments: /@license/i,
            },
          },
          extractComments: true,
        }),
      ],
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        minRemainingSize: 0,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: "~",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            idHint: "vendors",
          },
        },
      },
    },
  };
};
