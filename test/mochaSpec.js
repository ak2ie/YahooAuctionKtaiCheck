var assert = require('assert');
var should = require('chai').should();
var jQuery = require('../app/bower_components/jquery/dist/jquery.js');

describe('計算できること', function() {
  it('加算できること', function() {
    assert(1 + 2 == 3);
  });
});

describe('配列', function() {
  it('配列の合計が正しいこと', function() {
    [1, 2, 3].should.length(3);
  });
});

function doubleAsync(n, callback) {
  setTimeout(function() {
    callback(n * n);
  }, 100);
}

describe('非同期テスト', function() {
  it('done', function(done){
    doubleAsync(2, function(result) {
      result.should.equal(4);
      done();
    });
  });
});

function api_data() {
  var deferred = jQuery.ajax({
    url: 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20140222?format=json&keyword=%E6%A5%BD%E5%A4%A9&genreId=559887&shopCode=rakuten24&applicationId=#',
    type: 'jsonp'
  })
  .done(function(items) {})
  .fail(function(error) {});
}

describe('API Data Func', function() {
  it('should return correct data', function(done){
    api_data().always(function(result){
      exact(result['page']).to.equal(1);
      done();
    })
  })
})
