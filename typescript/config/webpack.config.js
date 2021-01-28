const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // Mobile Test Configurtion 
    devServer:{
        contentBase:path.resolve(__dirname,'/src'),
        disableHostCheck:true,
        host:'0.0.0.0'
    },
    name:'myTypeScript-setting',
    mode:'development', // "production" | "development" | "none"
    devtool:'eval',  // source-map   hidden-source-map
    resolve:{
        modules:['node_modules'],
        extensions:['.ts','json','.jsx','.tsx','.css','.js'],
    },
    entry:{
        index:['./src/index.tsx']
    }, // 기존파일
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].js',
        path: path.resolve(__dirname, 'public')
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all'
            },
            styles: {
              name: 'styles',
              test: /\.(css)$/,
              chunks: 'all',
            }
          },
        },
      },
    module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
                exclude:["/node_modules"]
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
            },
            { 
              test: /\.css$/,
              use:[
                'style-loader',
                "@teamsupercell/typings-for-css-modules-loader",
                {
                  loader: "css-loader",
                  options: { modules: true }
                }
              ],
              
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // test:/\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        // 2019-06-21 테스트이미지가 안불려서 ../ -> ./로 수정 
                        name:'./[path][hash].[ext]',
                        limit:10*1024 // 10kb
                    }
                }
            },
		]
    }, // 기존파일에 적용할 모듈 
    
    plugins:[
        new HtmlWebPackPlugin({
            template:'./public/index.html',
            filename:'./index.html',
            showErrors: true
        })
    ],
  
}