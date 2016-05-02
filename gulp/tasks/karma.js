'use strict';
// karma

var karma = require('karma').Server;
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var config = require('../config');
var watch = require('gulp-watch');
var error = require('../util/error');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('karma:exec', function() {
  new karma({
    configFile: __dirname + '/../../karma.conf.js'
  }).start();
});

gulp.task('karma:watch', function() {
  // // テストケースコンパイル
  // watch(['./test/spec/ts/*.ts'], function() {
  //   return gulp.src('./test/spec/ts/*.ts')
  //     .pipe(error.plumber({
  //       errorHandler: error.errorHandler
  //     }))
  //     .pipe(sourcemaps.init())
  //     .pipe(typescript(config.ts.compilerOptions))
  //     .js
  //     .pipe(sourcemaps.write())
  //     .pipe(gulp.dest('./test/spec/'));
  // });
  //
  // // ソースコンパイル
  // watch(['./app/scripts/ts/**/*.ts'], function() {
  //   gulp.start('webpack:exec');
  // });

  gulp.start('webpack:watch');

  // karma実行
  gulp.start('karma:exec');
})
