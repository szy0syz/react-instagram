# React-Instagram

* Client: react + antd
* Service: egg.js
* antd+egg: 阿里系的全栈解决方案

## 01 Webpack工作流搭建

创建目录和文件：client、service、README.md

**client**中 `npm init`

创建项目入口点文件index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
// 载入根组件
import Instagram from './src/pages/index'

// 渲染根组件
ReactDOM.render(
  <Instagram />,
  document.getElementById('root'),
);
```

创建根组件文件 /src/pages/index.js

```js
import React, { Component } from 'react';

class Instagram extends Component {
  render() {
    <h2>
      Instagram
    </h2>
  }
}

export default Instagram;
```

补依赖：`yarn add react react-dom`

开始配置前端webpack工作流

先装依赖 `yarn add webpack webpack-dev-server webpack-cli -D`

在 **client**根目录 新建webpack配置文件 `webpack.config.js`

安装依赖：`yarn add -D babel-core babel-loader babel-preset-env babel-preset-react`

依赖分别是：babel核心 babel的loader加载器 预编译env 和 react的预编译器

* entry 入口配置
* output 输出配置
    * 放到 **dist** 目录下
* **module** 配置loader
    * rules 是个对象数组
        * test、exclude、use用哪个loader
    * 第一个loader是babel-loader
        * 记得 `exclude: /node_modules/`
    * 第二个loader是url-loader
        * 记得还需要安装file-loader，两者前者依赖后者
        * `yarn add -D url-loader file-loader`
    * 第三个loader是预处理css的loader们
        * 有三个，要倒着写: `style-loader` `css-sloader`  `sass-loader`
        * `style-loader` 用来处理行内样式
        * `css-sloader` css文件用这个loader
        * `sass-loader` sass样式专用
        * `yarn add -D style-loader css-loader sass-loader node-sass`
* resolve
    * alias 配置别名，方便文件绝对路径指向
* devServer 开发配置
    * 指定 contentBase 内容路径
    * historyApiFallback 使用h5的前端路由时所有404响应转到首页index.html
    * `compress: true`  开发环境启用gzip
    * overlay 全屏显示编译错误
    * disableHostCheck 禁用主机检查，开发环境没必要
* plugins 插件数组
    * HtmlWebpackPlugin webpack打包html文件
        * 安装依赖 `yarn add -D html-webpack-plugin` 
    * HotModuleReplacementPlugin webpack热更替插件，改变后不需要全部重新打包

```js
const path = require('path');
// ‘html-webpack-plugin’ 插件负责加载html模板填值
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 转换解决当前项目的路径
const clientPath = path.resolve(__dirname);

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
    contentBase: path.resolve(clientPath, "dist"),
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 7000,
    inline: true,
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(clientPath, 'index.html'),
      filename: 'index.html',
      // favicon: path.relative(clientPath, 'assets/image/favcion.ico')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

> 因为 babel-loader 8 更新太快，相关preseet还没更新支持8，故将babel-loader 降级到7.1.5版本。
