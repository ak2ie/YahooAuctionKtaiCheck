// エラー通知
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');

module.exports = {
  errorHandler : function(error) {
    notifier.notify({
      message: error.message,
      title: error.plugin,
      sound: 'Glass'
    });
    this.emit('end');
  },
  plumber: plumber
}
