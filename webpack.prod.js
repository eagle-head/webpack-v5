const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = (function () {
  return {
    context: path.resolve(__dirname, "./"),

    mode: "production",

    target: "web",

    entry: {
      bundle: path.resolve(__dirname, "src"),
    },

    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "static/js/[name]~[contenthash:16].js",
    },

    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin(),
      new webpack.WatchIgnorePlugin({ paths: [/node_modules/] }),
      new HtmlWebpackPlugin({
        title: "React Webpack v5",
        template: path.resolve(
          __dirname,
          "assets",
          "templates",
          "index.template.ejs"
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
          test: /\.(js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name]~[contenthash:16].[ext]",
                outputPath: "static/images/",
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ["babel-loader", "@svgr/webpack", "url-loader"],
        },
      ],
    },

    optimization: {
      minimize: true,
      moduleIds: "deterministic",
      runtimeChunk: {
        name: "runtime",
      },
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        automaticNameDelimiter: "~",
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: 4,
          extractComments: true,
          terserOptions: {
            output: {
              comments: /@license/i,
            },
          },
        }),
      ],
    },
  };
})();
