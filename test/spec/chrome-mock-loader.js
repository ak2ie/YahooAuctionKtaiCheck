//require(['../../node_modules/chrome-mock/browser'], function() {});

chrome = {
  storage: {
    sync: {
      set: function() {
      }
    }
  },
  runtime: {
    sendMessage: function(params, callback) {
      callback();
    },
    onMessage: {
      addListener: function(request, sender, sendResponse) {
      }
    }
  }
};
