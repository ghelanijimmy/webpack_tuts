const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["syntax-dynamic-import"],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        // User styles
        test: /\.(css|less|s[ac]ss|styl)$/,
        use: [
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: true,
              modules: {
                mode: "local",
                localIdentName: "[local]__[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [autoprefixer()],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "url-loader",
      },
      {
        test: /\.(png|jpg|gif|svg|mp3)$/,
        loader:
          process.env.NODE_ENV === "production" ? "file-loader" : "url-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebPackPlugin({
      title: "Webpack",
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: 3000,
    host: "0.0.0.0",
  },
  devtool:
    process.env.NODE_ENV === "development"
      ? "eval-cheap-module-source-map"
      : "source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          chunks: "all",
          filename: "[name].js",
        },
        app: {
          test: /[\\/]src[\\/]/,
          name: "app",
          chunks: "all",
        },
      },
    },
    providedExports: process.env.NODE_ENV !== "production",
    minimize: process.env.NODE_ENV === "production",
  },
  performance:
    process.env.NODE_ENV === "production"
      ? false
      : {
          hints: "warning",
        },
};
