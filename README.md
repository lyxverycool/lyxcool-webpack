## 安装
    npm i lyxcool-webpack -s

### 1.目录介绍
    src（插件源码） 
    lib (插件编译之后代码)

### 2.编译
    实时编译 npm run build

### 3.使用

```javascript
const  { webpackConfig }  = require('lyxcool-webpack')

module.exports = webpackConfig
```

### 4.案例

  [https://github.com/lyxverycool/react-csr-templete](https://github.com/lyxverycool/react-csr-templete)

  目前只支持react 客户端渲染

### 5.扩展

可以自定义webpack的配置

if (process.env.DEV_SERVER) {
  webpackConfig.devServer.port = 12306
  ....
}



