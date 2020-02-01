const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const srcRoot = path.resolve(__dirname, 'src')
const distPath = path.resolve(__dirname, '../waimaiServer/public')
const pageDir = path.resolve(srcRoot, 'page')
const mainFile = 'index.js'

// 多页面
  function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach((key) => {
      let fullPathName = path.resolve(pageDir, key);
      let fileName = path.resolve(fullPathName, key + '.html');

      if (fs.existsSync(fileName)) {
        htmlArray.push(new HtmlWebpackPlugin({
          filename: key + '.html',
          template: fileName,
          chunks: ['common', key]
        }))
      }
    })

    return htmlArray
  }

// 多文件入口遍历配置
function getEntry() {
  let entryMap = {}

  // 同步文件下所有的路径，进行判断
  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname)
    let stat = fs.statSync(fullPathName)
    let fileName = path.resolve(fullPathName, mainFile)

    // 判断是路径还是文件
    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName
    }
  })

  return entryMap
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: 'production',
  entry: entryMap,
  resolve: {
    alias: {
      component: path.resolve(srcRoot, 'component')
    },
    extensions: ['.js', '.jsx']
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].min.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'}, {loader: 'eslint-loader'}], include: srcRoot},
      {test: /\.scss$/, use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {minimize: true}}, 'sass-loader', {
        loader: 'sass-resources-loader',
        options: {
          resources: srcRoot + '/component/rem_function.scss'
        }
      }], include: srcRoot},
      {test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8194&name=./images/[name].[hash].[ext]', include: srcRoot}
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/node_modules[\\/]/,
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {allowExternal: true}),
    new CopyWebpackPlugin([
      {from: 'src/json', to: path.resolve(distPath, 'json'), force: true},
      {from: 'src/static', to: path.resolve(distPath, 'static'), force: true}
    ]),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css"
    })
  ].concat(htmlArray)
}