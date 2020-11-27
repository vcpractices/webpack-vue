# my-app

> A Vue.js project a simple Tasks app

## Build Setup

``` bash
# instalar dependencias webpack autoconfig
npm install -g vue-cli
npm install -D vue-loader vue-template-compiler
npm install --save axios vue-axios

# crear proyecto vue
vue init webpack-simple my-app

# instalar dependecias backend nodejs
npm install express
npm install body-parser
npm install cors
npm install morgan
npm install mongoose

# database
MongoDB - https://www.mongodb.com/try/download/community

# server nodejs with hot reload at localhost:3000
nodemom src/index.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
