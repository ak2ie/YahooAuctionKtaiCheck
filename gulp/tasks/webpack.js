'use strict';
// webpack

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var config = require('../config');
var watch = require('gulp-watch');
var error = require('../util/error');

/**
 * webpackを実行
 */
gulp.task('webpack:exec', function() {
  gulp.src('./dummypath')
    .pipe(error.plumber({
      errorHandler: error.errorHandler  // エラー通知
    }))
    .pipe(webpack(require(config.webpack.configFile)))
    .pipe(gulp.dest(config.webpack.distDir));
});

gulp.task('webpack:watch', ['webpack:exec'], function() {
  return watch(['./app/scripts/ts/**/*.ts', './test/spec/ts/*.ts'], function() {
      return gulp.start(['webpack:exec']);
  });
});
