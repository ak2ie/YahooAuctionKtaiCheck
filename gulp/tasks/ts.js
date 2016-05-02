'use strict';
// TypeScript

var gulp = require('gulp');
var typescript = require('gulp-typescript');
var config = require('../config');
var error = require('../util/error');

/**
 * TypeScript コンパイル
 */
gulp.task('ts', function() {
  return gulp.src(config.ts.src)        // コンパイル対象ファイルは、tsconfig.json:filesGlobに記載
    .pipe(error.plumber({
      errorHandler: error.errorHandler  // エラー通知
    }))
    .pipe(typescript(config.ts.compilerOptions))
    .js
    .pipe(gulp.dest('app/scripts/'));
});
