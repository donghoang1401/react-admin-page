// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin";
// @ts-ignore
import InterpolateHtmlPlugin from "interpolate-html-plugin";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackConfig = () => ({
  mode: "development",
  entry: "./src/index.js",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    // @ts-ignore
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        include: path.resolve(__dirname, "src"),
        exclude: /build/,
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "static", // can modify `static` to another name or get it from `process`
    }),
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  // @ts-ignore
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});

export default webpackConfig;
