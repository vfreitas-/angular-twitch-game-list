const webpack = require('webpack')
    , { resolve } = require('./utils')

const HtmlWebpackPlugin     = require('html-webpack-plugin')
    , ExtractTextPlugin     = require('extract-text-webpack-plugin')

    // TODO: Add to dev build only
    , BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    , DashboardPlugin = require('webpack-dashboard/plugin')

const postcssConfig = require('./config/postcss.config')
    

const vendorIgnore = [
    'core.js'
]

module.exports = {
    devtool: 'inline-source-map',

    entry: {
        vendor: Object.keys(require('../package').dependencies)
            .filter(d => !(d in vendorIgnore)),

            app: './src/main.ts',
            polyfills: './src/polyfills.ts'
            // styles: './src/global.scss',
    },

    output: {
        path: resolve('dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: [
            '.js', '.ts', '.html'
        ],
        alias: {
            '@shared': resolve('src/app/shared'),
            '@scssconf': resolve('src/assets/sass/config')
        }
    },

    devServer: {
        contentBase: resolve('dist'),
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                // use: [ 'awesome-typescript-loader?configFileName=config/tsconfig.json', 'angular2-template-loader' ]
                use: [ 'awesome-typescript-loader', 'angular2-template-loader' ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            // {
            //     test: /\.scss$/,
            //     exclude: [ /node_modules/, helpers.root('src', 'global.scss') ],
            //     use: [ 'to-string-loader', 'css-loader', 'sass-loader' ]
            // },
            {
                test: /\.css$/,
                loader: 'to-string-loader!css-loader!postcss-loader'
            },
            {
                test: /\.scss$/,
                include: resolve('src/app'),
                use: [
                    'to-string-loader',
                    'css-loader?importLoaders=1',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: { path: resolve('build/config/postcss.config.js') }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: resolve('src/assets'),
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: { path: resolve('build/config/postcss.config.js') }
                        }
                    },
                    'sass-loader'
                ]
            },
            // {
            //     test: /global\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         use: 'css-loader!sass-loader'
            //     })
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
            //     use: 'url-loader?name=assets/[name].[hash].[ext]'
            // },
            {
                test: /\.(eot|otf|ttf|woff|woff2)(\?v=[a-z0-9=\.]+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app', 'vendor', 'polyfills' ]
        }),

        new HtmlWebpackPlugin({
            template: resolve('index.html'),
            filename: 'index.html',
            showErrors: true,
            path: resolve('dist'),
            hash: true
        }),

        // new BundleAnalyzerPlugin(),
        new DashboardPlugin()
    ]
};