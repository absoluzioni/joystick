const path = require("path")

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    // If in the future the creator of the postcss-hexrgba package
    // releases an update (it is version 2.0.1 as I'm writing this)
    // then it will likely work with PostCSS V8 so you can uncomment
    // the line below and also install the package with npm.
    //require('postcss-hexrgba'),
    require('autoprefixer')
  ]

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
      directory: path.join(__dirname, "app"),
      watch: false
    },
    hot: true,
    port: 3000
  },
  mode: "development",
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", { loader: "css-loader", options: { url: false } }, { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
        {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
        }
    ]
  }
}
