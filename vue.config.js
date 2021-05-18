// vue.config.js
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'));
  },
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true,
      },
    },
  },
  // 在旧版本中称为 baseUrl, 设置项目的url前缀
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 3000,
  },
  // 关于webpack的配置项, 会通过webpack-merge合并到最终的项目配置中
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: "raw-loader",
        },
      ],
    },
  },
};
