const webpack       = require('webpack')
    , merge         = require('webpack-merge')
    , commonConfig  = require('./webpack.common.js')

const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    , DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = merge(commonConfig, {
    

    plugins: [
        new DashboardPlugin()
    ]
})