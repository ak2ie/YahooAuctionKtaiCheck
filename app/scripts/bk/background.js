'use strict';

// メッセージ(type)に応じて処理を振り分ける
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type !== undefined) {
      switch(request.type) {
        // 利用制限チェックページを開く
        case 'openSeigenPage' :
          openRiyoSeigenPage(request.data, sendResponse);
          return true;
          break;
        // 商品説明、カテゴリーなどの情報を取得
        case 'getSyohinData' :
          getSyohinData(request.data.auctionID, sendResponse);
          return true;
          break;
        default:
          throw new Error('存在しないメッセージタイプです!');
      }
    } else {
      throw new Error('メッセージタイプが指定されていません!');
    }
  }
);

/**
* Yahoo!のアプリケーションIDを取得する
* @method LoadYahooAppID
* @return {String} アプリケーションID
*/
function LoadYahooAppID() {
  var yahooAppID = localStorage.getItem('yahooAppID');
  return yahooAppID;
}

/**
* 利用制限チェックページを開く
* @method openRiyoSeigenPage
* @param data {Object} 必要な情報が入った配列（Carrer:キャリア, IMEI:IMEI）
*/
function openRiyoSeigenPage(data) {
  // 携帯電話利用制限確認ページURL
  var IMEICheckURLs = {
    NTTdocomo:  'http://nw-restriction.nttdocomo.co.jp/search.php',
    au:         'https://au-cs0.kddi.com/FtHome',
    softbank:   'https://ct11.my.softbank.jp/WBF/icv'
  };

  // 利用制限確認ページIMEI入力inputタグname属性名
  var IMEIInputTagNames = {
    NTTdocomo:  'productno',
    au:         'IMEI',
    softbank:   'imei'
  };

  chrome.windows.create(
    {
      url: IMEICheckURLs[data.Career],
      type: 'popup',
      width: 920,
      height: 600
    },
    function(window) {
      chrome.tabs.executeScript(
        window.tabs[0].id,
        {file: "bower_components/jquery/dist/jquery.min.js"},
        function() {
          chrome.tabs.executeScript(
            window.tabs[0].id,
            {code: '$(function() {$(\'input[name="' + IMEIInputTagNames[data.Career] + '"]\').val(' + data.IMEI + ');});'}
          );
        }
      );
    }
  );
}

/**
* オークションの商品データ（説明、カテゴリーなど）を取得する
* @method getSyohinSetumei
* @param data {auctionID}  オークションID
* @return {Object} 商品データ http://developer.yahoo.co.jp/webapi/auctions/auction/v2/auctionitem.html
*/
function getSyohinData(auctionID, sendResponse) {
  console.group('商品説明取得');
  console.log('オークションID:', auctionID);
  execYahooAuctionAPI(auctionID)
  .done(function(res) {
    console.log(res);
    var regexpJSONResponse = /loaded\((.*)\)/;
    var resultJSONText = regexpJSONResponse.exec(res.responseText);
    var resultJSON = JSON.parse(resultJSONText[1]);

    if (resultJSON.length == 0) {
      throw new Error('API実行結果取得に失敗しました。');
    }

    // 商品説明
    var syohinSetsumei = resultJSON.ResultSet.Result.Description;
    // カテゴリー
    var category = resultJSON.ResultSet.Result.CategoryPath;

    //console.log('商品説明:', syohinSetsumei);
    console.groupEnd();
    sendResponse( {
      result: true,
      data: {
        syohinSetsumei: syohinSetsumei,
        category: category
      }
    });
  })
  .fail(function(res){
    console.error('商品説明の取得に失敗しました!');
    sendResponse( {
      result: false,
      error: res.error
    });
  });
}

/**
* Yahoo!オークションAPIを実行して、結果を取得する
* @method execYahooAuctionAPI
* @param auctionID {String} オークションID
* @return {Object} APIの実行結果
*/
function execYahooAuctionAPI(auctionID) {
  var deferred = new $.Deferred();

  var yahooAppID = LoadYahooAppID();
  if(yahooAppID != null || yahooAppID !== '') {
    $.ajax({
      type: 'GET',
      url: 'http://auctions.yahooapis.jp/AuctionWebService/V2/auctionItem',
      dataType: 'json',
      data: {
        appid     : yahooAppID,
        output    : 'json',
        auctionID : auctionID
      }
    }).done(function(res) {
      deferred.resolve(res);
    }).fail(function(jqXHR, textStatus, error) {
      // console.log(jqXHR);
      // console.log(textStatus);
      // console.log(error);

      if (jqXHR.status === 200) {
        // 通信できた場合は、データを取得できたと見なす
        // （JSONパースに失敗してエラーとなっている場合）
        deferred.resolve(jqXHR);
      } else {
        deferred.reject(jqXHR);
      }
    });
  } else {
    deferred.reject({
      error: 'failedGetYahooAppID'
    });
  }

  return deferred;
}
