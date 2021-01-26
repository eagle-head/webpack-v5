const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

//eslint-disable-next-line
module.exports = function (env, argv) {
  return {
    entry: {
      bundle: "./src/index.js",
    },

    mode: "production",

    target: "web",

    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "static/js/[name]~[contenthash:16].js",
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new HtmlWebpackPlugin({
        title: "React Webpack v5",
        template: path.resolve(
          __dirname,
          "assets",
          "templates",
          "index.template.html"
        ),
      }),
      new CopyPlugin({
        patterns: [{ from: "./public/robots.txt", to: "./" }],
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
