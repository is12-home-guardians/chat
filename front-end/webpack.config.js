const { DefinePlugin }        = require("webpack");
const path                    = require("path");
const convert                 = require('koa-connect');
const history                 = require('connect-history-api-fallback');
const BundleAnalyzerPlugin    = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const UglifyJsPlugin          = require("uglifyjs-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    entry: "./src/index.tsx",
    mode: NODE_ENV || "production",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    optimization: {
        ...(NODE_ENV === "production" ? {
            splitChunks: {
                cacheGroups: {
                    appRoot: {
                        test: /src\/App.tsx/ig,
                        name: "app-root",
                        chunks: "initial",
                        enforce: true
                    },
                    react: {
                        test: /node_modules\/react/,
                        name: "react.vendor",
                        chunks: "initial",
                        enforce: true
                    },
                }
            }
        }
      :                                 {}
        )
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: './assets/',
                    to: '.'
                },
            ]
        ),
        // new BundleAnalyzerPlugin(),
        new DefinePlugin(
            Object.entries(process.env)
                .map(x => ({["process.env." + x[0]]: JSON.stringify(x[1])}))
                .reduce((x, y) => Object.assign(x, y), {}),
        ),
        new HtmlWebpackPlugin({
            hash: true,
            title: "Chat" + NODE_ENV === "development" ? " - dev" : "",
            minify: (
                NODE_ENV === "production" ? {
                    caseSensitive: true,
                    collapseBooleanAttributes: true,
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    preserveLineBreaks: true,
                    useShortDoctype: true
                }
              :                                         false
            ),
            filename: "index.html",
            template: "src/index.html"
        }),
    ],
    serve: {
        add: (app, middleware, options) => {
            app.use(convert(history()));
        },
        content: path.resolve(__dirname, 'assets'),
        open: true
    }
};
