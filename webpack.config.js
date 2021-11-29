const path = require("path");
const miniCssPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s*)css$/,
        use: [miniCssPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|gif|jpg|jpeg)$/,
        loader: 'file-loader',
        options: {
          outputPath: './dist/imgs',
        },
      },
    ],
  },
  plugins: [
    new miniCssPlugin({
      filename: "style.css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9002,
    host: "192.168.1.144",
  },
};
