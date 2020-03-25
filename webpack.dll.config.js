const path = require('path');
const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-dom',
    'react-loadable',
    'redux',
    'redux-immutable',
    'redux-saga',
    'redux-actions',
    'redux-thunk',
    'querystring',
    'core-js',
    'immutable',
    'moment',
    'axios',
    'uuid-js'
];

module.exports = {
    entry: {
        vendors
    },
    output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'dll', 'manifest.json'),
            name: '[name]_[hash]',
            context: __dirname
        })
    ]
};
