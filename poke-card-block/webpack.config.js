const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

module.exports = {
    ...defaultConfig,
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            "@src": path.resolve(__dirname, "../src"),
            "@img": path.resolve(__dirname, "../src/img"),
            "@sass": path.resolve(__dirname, "../src/sass"),
        },
    }
};
