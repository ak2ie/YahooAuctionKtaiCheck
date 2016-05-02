'use strict';

var dir = require('require-dir');
dir('./gulp/tasks', {
  recurse: true // フォルダ内を再帰検索
});
