const webpack       = require('webpack')
    , merge         = require('webpack-merge')
    , commonConfig  = require('./webpack.common.js')

const ExtractTextPlugin     = require('extract-text-webpack-plugin')

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: false
                }
            }
        })
    ]
})