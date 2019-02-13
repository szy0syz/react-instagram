const path = require('path')
// ‘html-webpack-plugin’ 插件负责加载html模板填值
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 转换解决当前项目的路径
const clientPath = path.resolve(__dirname)

module.exports = {
  entry: {
    main: path.resolve(clientPath, 'index.js')
  },
  output: {
    publicPath: '/',
    path: path.resolve(clientPath, 'dist'),
    filename: 'src/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      {
        test: /\.(css|less|sass)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': clientPath,
      '@scss': path.resolve(clientPath, 'assets/style'),
      '@assets': path.resolve(clientPath, 'assets'),
      '@components': path.resolve(clientPath, 'src/components'),
      '@common': path.resolve(clientPath, 'src/common')
    }
  },
  devServer: {
    contentBase: path.resolve(clientPath, 'dist'),
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 7000,
    inline: true,
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
      }
    } //重定向
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(clientPath, 'index.html'),
      filename: 'index.html'
      // favicon: path.relative(clientPath, 'assets/image/favcion.ico')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
