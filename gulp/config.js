var tsconfig = require('../tsconfig.json');   // TypeScript設定

module.exports = {
  ts : {
    src : tsconfig.files,
    compilerOptions: tsconfig.compilerOptions
  },
  webpack : {
    src: './app/scripts/ts/contentscript/entry.ts',
    distDir: './app/scripts/',                            // 出力先フォルダ。プロジェクトのルートからの相対パス。最後に"/"を含めること。
    configFile: '../../webpack.config.js'                 // 設定ファイル。config.jsからの相対パス。
  }
};
