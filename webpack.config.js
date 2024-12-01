const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: [
            path.resolve(__dirname, 'src/index.ts'),
        ],
        pokeCard: [
            path.resolve(__dirname, 'src/sass/poke-card.sass'),
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    resolve: {
        alias: {
            "@node_modules": path.resolve(__dirname, "node_modules"),
            "@src": path.resolve(__dirname, "src"),
            "@img": path.resolve(__dirname, "src/img"),
            "@sass": path.resolve(__dirname, "src/sass"),
        },
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(s[ac])|(c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            viewport: 'width=device-width, initial-scale=1.0',
            minify: true,
        }),
        new MiniCssExtractPlugin()
    ]
}