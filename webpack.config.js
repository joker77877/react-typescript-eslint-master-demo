const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin'); // 全局变量
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const outputPath = {
    dev: '../resource/static/',
    development: 'dist',
    production: '../resource/static/'
};

const publicPath = {
    dev: '/ctm01pcka-web/static/',
    development: '/',
    production: '/ctm01pcka-web/static/'
};

const devtool = {
    dev: 'cheap-eval-source-map',
    development: 'cheap-module-eval-source-map',
    production: 'source-map'
};

// 公共打包插件
const publicPlugins = env => {
    const isDev = env !== 'production';
    return [
        new ExtendedDefinePlugin({
            // 全局变量
            isDev
        }),
        // 它建立在新的webpack v4功能（模块类型）之上，并且需要webpack 4才能工作。
        // 此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMaps的按需加载。
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: env !== 'production' ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: env !== 'production' ? 'css/[id].css' : 'css/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('src/templates/index.html'), // 源html
            inject: 'body', // 所有javascript资源将被放置在body元素的底部
            filename: isDev ? 'index.html' : path.resolve(__dirname, outputPath[env], '../templates/index.html'), // 输出后的名称
            // filename: 'index.html', // 输出后的名称
            hash: true, // 为静态资源生成hash值
            showErrors: true // 错误详细信息将写入HTML页面
        }),
        // 将`vendors`文件注入到html模版中
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dll/vendors.dll.js'),
            includeSourcemap: false,
            publicPath: publicPath[env]
            // publicPath: path.resolve(__dirname, outputPath[env], '../index.html')
        })
        // new CopyWebpackPlugin([
        //     { from: 'dll/vendors.dll.js' }
        //     // { from: 'src/lib/xmap/hgis.js', to: './hgis-web/' },
        //     // { from: 'src/lib/xmap/hgis.css', to: './hgis-web/' }
        // ])

        // new HappyPack({
        //     //多线程运行 默认是电脑核数-1
        //     id: 'babel', //对于loaders id
        //     loaders: ['cache-loader', 'babel-loader?cacheDirectory'], //是用babel-loader解析
        //     threadPool: happyThreadPool,
        //     verboseWhenProfiling: true //显示信息
        // })
        // // new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
    ];
};

// 打包需要的插件
const buildPlugins = () => [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
            path.resolve(__dirname, '../resource')
            // path.resolve(__dirname, '../icsc-web/view/src/main/resources/static'),
            // path.resolve(__dirname, '../icsc-web/view/src/main/resources/templates')
        ],
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: false
    }),
    // //该插件会根据模块的相对路径生成一个四位数的散列作为模块id，建议用于生产环境
    new webpack.HashedModuleIdsPlugin(),
    // //DLLPlugin和DLLReferencePlugin用某种方法实现了拆分捆绑，同时还大大提升了构建的速度。
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/manifest.json')
    })
    // new BundleAnalyzerPlugin({
    //     //另外一种方式
    //     analyzerMode: 'server',
    //     analyzerHost: '127.0.0.1',
    //     analyzerPort: 8889,
    //     reportFilename: 'report.html',
    //     defaultSizes: 'parsed',
    //     openAnalyzer: true,
    //     generateStatsFile: false,
    //     statsFilename: 'stats.json',
    //     statsOptions: null,
    //     logLevel: 'info'
    // })
];
const pluginsCallBack = env => {
    const plugin = {
        // dev: [].concat(pluginsPublic, pluginsBuild),
        development: [...publicPlugins(env)],
        production: [...publicPlugins(env), ...buildPlugins(env)]
    };
    return plugin[env];
};

module.exports = env => {
    console.log(env);

    const devMode = env === 'development';
    return {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: {
            path: path.resolve(__dirname, outputPath[env]), // 出口路径
            publicPath: publicPath[env],
            filename: 'js/[name].[hash].js',
            chunkFilename: 'js/[name].[chunkhash:8].js' // 按需加载名称
        },
        devServer: {
            contentBase: path.join(__dirname, './dist'), // 开发服务运行时的文件根目录
            compress: true, // 开发服务器是否启动gzip等压缩
            clientLogLevel: 'none', // 是否打印log
            host: '127.0.0.1',
            port: 3000, // 端口
            historyApiFallback: true // 不会出现404页面，避免找不到
        },
        devtool: devtool[env], // cheap-eval-source-map  是一种比较快捷的map,没有映射列
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            mainFields: ['main', 'jsnext:main', 'browser'], // npm读取先后方式  jsnext:main 是采用es6模块写法
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less', '.scss', '.json'], // 在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在, 默认['.js', '.json']
            // alias: {
            //     // 快捷入口
            //     '@': path.resolve(__dirname, 'src/'),
            //     'api': path.resolve(__dirname, 'src/api/'),
            //     'components': path.resolve(__dirname, 'src/components/'),
            //     'views': path.resolve(__dirname, 'src/views/'),
            //     'styles': path.resolve(__dirname, 'src/styles/'),
            //     'lib': path.resolve(__dirname, 'src/lib/'),
            //     'server': path.resolve(__dirname, 'src/lib/server'),
            //     'svg': path.resolve(__dirname, 'src/images/svg/'),
            //     'images': path.resolve(__dirname, 'src/images'),
            //     'router': path.resolve(__dirname, 'src/router'),
            //     '@redux': path.resolve(__dirname, 'src/redux'),
            //     'reducers': path.resolve(__dirname, 'src/redux/reducers'),
            //     'actions': path.resolve(__dirname, 'src/redux/actions'),
            //     'config': path.join(__dirname, 'config'),
            //     'theme': path.join(__dirname, 'src/theme')
            // },
            plugins: [new TsconfigPathsPlugin()]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/, // 支持箭头函数，class等
                    use: [
                        // 'cache-loader',
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true
                            }
                        }
                    ],
                    exclude: path.resolve(__dirname, 'node_modules'),
                    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'config')]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: devMode,
                                reloadAll: true,
                                publicPath: '../'
                            }
                        },
                        // {
                        //     loader: 'style-loader'
                        // },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ],
                    // exclude: path.resolve(__dirname, 'node_modules'),
                    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/antd/es')]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: devMode,
                                reloadAll: true,
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass')
                            }
                        }
                    ],
                    exclude: path.resolve(__dirname, 'node_modules'),
                    include: path.resolve(__dirname, 'src')
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: devMode,
                                reloadAll: true,
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ],
                    exclude: [path.resolve(__dirname, 'node_modules')],
                    include: [path.resolve(__dirname, 'src')]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: devMode,
                                reloadAll: true,
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                modifyVars: {
                                    'font-size-base': '12px'
                                },
                                javascriptEnabled: true
                            }
                        }
                    ],
                    include: [path.resolve(__dirname, 'node_modules/antd')]
                },
                {
                    test: /\.(woff|svg|ttf|eot)(\?.*)?$/,
                    exclude: /node_modules/,
                    // exclude: [/\.(js|mjs|jsx|ts|tsx|less|html|json)$/],
                    include: [path.resolve(__dirname, 'src')], // 包括
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8024,
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|jpeg|gif|png)$/,
                    exclude: /node_modules/,
                    include: [path.resolve(__dirname, 'src')], // 包括
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // limit 图片大小的衡量，进行base64处理
                                limit: 8024,
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new TerserJSPlugin({
                    // 压缩js
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                // include all types of chunks
                chunks: 'all'
            },
            runtimeChunk: {
                name: 'runtime'
            }
        },
        plugins: pluginsCallBack(env)
    };
};
