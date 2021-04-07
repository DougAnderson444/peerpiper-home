const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const svelte = path.resolve('node_modules', 'svelte')
const sveltePreprocess = require('svelte-preprocess')

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['theme']
  }
})

module.exports = {
  resolve: {
    alias: {
      svelte
    },
    extensions: ['.svelte', '.ts', '.js', '.mjs'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess,
            emitCss: true,
            hydratable: true,
            hotReload: false
          }
        }
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
        options: {
          esModule: true
        }
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({ clearConsole: true })
  ]
}
