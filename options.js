/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/// <reference path="../../../../typings/main.d.ts" />
	function yahooAppIDCheck(appID) {
	    // 「チェック中」のメッセージを表示
	    $('#yahooAppIDCheckingMsg').hide();
	    $('#yahooAppIDCheckingMsg')
	        .addClass('alert-info')
	        .text('チェック中...')
	        .show();
	    // アプリケーションIDのチェックを行うため、カテゴリーを取得する
	    execYahooAuctionAPI(appID)
	        .done(function (res) {
	        $('#yahooAppIDCheckingMsg').text('OK!');
	    })
	        .fail(function (res) {
	        $('#yahooAppIDCheckingMsg')
	            .addClass('alert-danger')
	            .text('IDが正しくありません!');
	    });
	}
	/**
	 * Yahoo!オークションAPIを実行して、結果を取得する
	 * @method execYahooAuctionAPI
	 * @param appID {String} アプリケーションID
	 * @return {Object} APIの実行結果
	 */
	function execYahooAuctionAPI(appID) {
	    var deferred = $.Deferred();
	    $.ajax({
	        type: 'GET',
	        url: 'http://auctions.yahooapis.jp/AuctionWebService/V2/categoryTree',
	        dataType: 'json',
	        data: {
	            appid: appID,
	            output: 'json'
	        }
	    }).done(function (res) {
	        deferred.resolve(res);
	    }).fail(function (jqXHR, textStatus, error) {
	        // console.log(jqXHR);
	        // console.log(textStatus);
	        // console.log(error);
	        if (jqXHR.status === 200) {
	            // 通信できた場合は、データを取得できたと見なす
	            // （JSONパースに失敗してエラーとなっている場合）
	            deferred.resolve(jqXHR);
	        }
	        else {
	            deferred.reject(jqXHR);
	        }
	    });
	    return deferred;
	}
	function SaveYahooAppID(appID) {
	    localStorage.setItem('yahooAppID', appID);
	}
	function LoadYahooAppID() {
	    var yahooAppID = localStorage.getItem('yahooAppID');
	    return yahooAppID;
	}
	$(function () {
	    $('#yahooAppIDCheckBtn').on('click', function () {
	        var yahooAppID = $('#yahooAppID').val();
	        yahooAppIDCheck(yahooAppID);
	    });
	    $('#save').on('click', function () {
	        if ($('#yahooAppID').val() !== '') {
	            var yahooAppID = $('#yahooAppID').val();
	            SaveYahooAppID(yahooAppID);
	        }
	    });
	    var yaooAppIDFromLocalStorage = LoadYahooAppID();
	    if (yaooAppIDFromLocalStorage !== '') {
	        $('#yahooAppID').val(yaooAppIDFromLocalStorage);
	    }
	});


/***/ }
/******/ ]);