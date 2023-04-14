const path = require("path");

const webpackConfig = {
    entry: {
        path: path.join(__dirname, "./client/index.jsx"),
    },
    output: {
        path: path.join(__dirname, "./public/dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
            }
        ],
    },
};

module.exports = webpackConfig;
