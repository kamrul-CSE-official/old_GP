var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.(jpg|png|svg)$/i,
        loader: "url-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test:/\.(jpg|png|gif|cur|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
          },
        }
      ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
            limit: 10000,
            name: '[name].[hash:7].[ext]'
        }
     },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  resolve: {
    mainFiles: ["index", "Index"],
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "https://192.168.1.253:8080",
      apiUrlHost: "https://192.168.1.253:4042/api",
    }),
  },
};
