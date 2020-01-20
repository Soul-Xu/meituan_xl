const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const srcRoot = path.resolve(__dirname, 'src')
const devPath = path.resolve(__dirname, 'dev')
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
          chunks: [key]
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
  mode: 'development',
  devServer: {
    contentBase: devPath,
    hot: true
  },
  entry: entryMap,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'}, {loader: 'eslint-loader'}], include: srcRoot},
      {test: /\.css$/, use: ['style-loader', 'css-loader'], include: srcRoot},
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'sass-resources-loader',
        options: {
          resources: srcRoot + '/component/common.scss'
        }
      }], include: srcRoot},
      {test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8194', include: srcRoot}
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ].concat(htmlArray)
}