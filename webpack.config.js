module.exports = {
  entry: {
    'background': ['./app/scripts/ts/background/background.ts'],
    'contentscript': './app/scripts/ts/contentscript/contentscript.ts',
    'options': './app/scripts/ts/option/options.ts',
    '../../test/spec/tsSpec': './test/spec/ts/tsSpec.ts'
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {loader: 'ts-loader'}
    ]
  }
}
