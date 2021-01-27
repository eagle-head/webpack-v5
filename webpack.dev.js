const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const dotenv = require("dotenv").config({
  path: `${__dirname}/.env.development`,
});

module.exports = (function () {
  return {
    context: path.resolve(__dirname, "./"),

    mode: "development",

    target: "web",

    entry: path.resolve(__dirname, "src", "index.js"),

    output: {
      path: path.join(__dirname, "/build"),
      publicPath: "/",
      filename: "[name].js",
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
      new CopyPlugin({
        patterns: [{ from: "./public/robots.txt", to: "build" }],
      }),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(dotenv.parse),
      }),
      new HtmlWebpackPlugin({
        title: "React Webpack v5",
        template: path.resolve(
          __dirname,
          "assets",
          "templates",
          "index.template.ejs"
        ),
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, "assets", "icons", "favicon.png"),
        cache: "./.cache",
        prefix: "static/images/",
        favicons: {
          appName: "",
          appShortName: "",
          appDescription: "",
          developerName: "",
          developerURL: "",
          dir: "auto",
          lang: "pt-BR",
          background: "#AAA",
          theme_color: "#BBB",
          display: "standalone",
          appleStatusBarStyle: "black-translucent",
          orientation: "portrait",
          start_url: "./?utm_source=homescreen",
          scope: ".",
          version: "0.0.1",
          logging: false,
          icons: {
            favicons: true,
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            firefox: false,
            windows: false,
            yandex: false,
          },
        },
      }),
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
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ["babel-loader", "@svgr/webpack", "url-loader"],
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          exclude: /(fonts|node_modules)/,
          use: {
            loader: "url-loader",
            options: {
              limit: 50000,
            },
          },
        },
      ],
    },

    devtool: "eval-source-map",

    devServer: {
      contentBase: path.join(__dirname, "build"),
      historyApiFallback: true,
      compress: true,
      port: Number(process.env.PORT),
      host: process.env.HOST,
      overlay: true,
      hot: true,
      open: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },

    optimization: {
      minimize: false,
    },
  };
})();
