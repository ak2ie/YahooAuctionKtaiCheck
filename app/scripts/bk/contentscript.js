'use strict';

$(function() {
    // 「利用制限確認チェック」ボタン追加
    $('#list01')
        .find('tr td div.a1wrp')
        .each(function() {
            // 検索結果一覧ページに表示された商品一覧に対して処理を行う

            // IMEI
            var IMEI;
            // 「利用制限確認チェック」ボタンを追加するタグ
            var linkAppendTag = $(this);

            // 商品個別ページのURLを取得
            var syohinSetumeiURL = $(this)
                .find('h3 a')
                .attr('href');

            // 商品個別ページのURLからヤフオク！の商品IDを取得する
            var regexpAuctionID = /auction\/([a-z]*[0-9]{8,})/;
            var resRegexpAuctionID = regexpAuctionID.exec(syohinSetumeiURL);
            var auctionID = '';

            // 商品IDを取得できなかった場合
            if (resRegexpAuctionID === null || resRegexpAuctionID.length == 0) {
                throw new Error('オークションIDを取得できませんでした。');
            } else {
                auctionID = resRegexpAuctionID[1];
            }

            // APIを利用して商品説明を取得
            // getSyohinData(auctionID)
            getSyohinData(auctionID)
                .done(function(res) {
                    var syohinSetsumei = res.syohinSetsumei;
                    // IMEI（15桁の数字）を取得する正規表現
                    // 15桁より多い数字は対象外とするため、長さがちょうどの並びを探す
                    var regexp = /[^0-9]([0-9]{15})[^0-9]/;
                    IMEI = syohinSetsumei.match(regexp);

                    if (IMEI != null) {
                        var appendText = '<button class="yimei-btn yimei-btn-2 yimei-btn-2h">利用制限チェック</button> ( ' + IMEI[1] + ' )';

                        // キャリアを判別
                        var career = '';
                        career = findCarrer(res.category);

                        $(linkAppendTag)
                            .append(appendText)
                            .children('button')
                            .on('click', function() {
                                chrome.runtime.sendMessage({
                                    type: 'openSeigenPage',
                                    data: {
                                        IMEI: IMEI[1],
                                        Career: career
                                    }
                                });
                            });
                    }
                })
                .fail(function(res) {
                    console.error(res);

                    if (res === 'failedGetYahooAppID') {
                        toastr.error('携帯電話利用制限チェック', 'Yahoo!アプリケーションIDの取得に失敗しました');
                    }
                });
        });
});

/**
 * オークションの情報を取得する
 * @method getSyohinData
 * @param auctionID {String} オークションID
 * @return {Object} 商品の情報（商品説明、カテゴリーなど）
 */
function getSyohinData(auctionID) {
    var deferred = new $.Deferred();

    chrome.runtime.sendMessage({
            type: 'getSyohinData',
            data: {
                auctionID: auctionID
            }
        },
        function(res) {
            if (res.result === true) {
                deferred.resolve(res.data);
            } else {
                deferred.reject(res.error);
            }
        }
    );

    return deferred;
}

/**
 * カテゴリ表記からキャリアを判別する
 * @method findCarrer
 * @param strContainsCarrer {String} カテゴリ表記
 * @return {String} キャリア（NTTドコモ, au, ソフトバンク）。見つからなかった場合は空文字列を返す。
 */
function findCarrer(strContainsCarrer) {
    var career = '';

    if (strContainsCarrer.indexOf('NTTドコモ') !== -1) {
        career = 'NTTdocomo';
    } else if (strContainsCarrer.indexOf('au') !== -1) {
        career = 'au';
    } else if (strContainsCarrer.indexOf('ソフトバンク') !== -1) {
        career = 'softbank';
    } else if (strContainsCarrer.indexOf('ワイモバイル') !== -1) {
        career = 'softbank';
    }

    return career;
}
