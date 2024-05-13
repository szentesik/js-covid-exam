const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './app.js',
    mode: 'development',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: './index.html', to: DIST_DIR}
            ]
        })
    ],
    module: {
        rules: [        
        {
            test: /\.css$/i,
            use: [
            "style-loader",
            "css-loader"
            ]
        },    
        {
            test: /\.s[ac]ss$/i,
            use: [
            "style-loader",
            "css-loader",
            "sass-loader"
            ]
        },
        ]
    },
    devServer: {
        static: {
            directory: DIST_DIR
        },
        allowedHosts: ['all']
    },
}