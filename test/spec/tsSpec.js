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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../../typings/main.d.ts" />
	var background_ts_1 = __webpack_require__(1);
	describe('Hello', function () {
	    it('Hello', function () {
	        expect(88).toBe(88);
	        expect(90).toBe(90);
	    });
	});
	describe('Yahoo!オークションAPI', function () {
	    var bk;
	    describe('アプリケーションID正常取得', function () {
	        beforeEach(function () {
	            bk = new background_ts_1.default();
	            // Yahoo!アプリケーションIDはlocalStorageから取得される
	            spyOn(window.localStorage, "getItem").and.returnValue('sample_Application_ID');
	        });
	        it('返り値のみチェック', function (done) {
	            // Yahoo!オークションAPIをモック
	            spyOn($, 'ajax').and.callFake(function (req) {
	                var d = $.Deferred();
	                d.reject('test');
	                return d.promise();
	            });
	            bk.execYahooAuctionAPI('auctionID')
	                .always(function (result) {
	                expect(result).toBe('test');
	                done();
	            });
	        });
	        it('ステータスチェック（正常）', function (done) {
	            var ajaxResult = {
	                status: 200 // HTTPステータスが正常であれば、JSONパースに失敗しても成功と見なす
	            };
	            // Yahoo!オークションAPIをモック
	            spyOn($, 'ajax').and.callFake(function (req) {
	                var d = $.Deferred();
	                d.reject(ajaxResult);
	                return d.promise();
	            });
	            bk.execYahooAuctionAPI('n170871831')
	                .done(function (result) {
	                expect(result).toBe(ajaxResult);
	                done();
	            })
	                .fail(function () {
	                expect('想定外の').toBe('返り値');
	                done();
	            });
	        });
	        it('ステータスチェック（異常）', function (done) {
	            var ajaxResult = {
	                status: 400 // HTTPステータスが異常であれば、必ず異常と見なす
	            };
	            // Yahoo!オークションAPIをモック
	            spyOn($, 'ajax').and.callFake(function (req) {
	                var d = $.Deferred();
	                d.reject(ajaxResult);
	                return d.promise();
	            });
	            bk.execYahooAuctionAPI('n170871831')
	                .fail(function (result) {
	                expect(result).toBe(ajaxResult);
	                done();
	            })
	                .done(function () {
	                expect('想定外の').toBe('返り値');
	                done();
	            });
	        });
	    });
	    describe('アプリケーションID取得失敗', function () {
	        beforeEach(function () {
	            bk = new background_ts_1.default();
	        });
	        it('null', function (done) {
	            // アプリケーションID：nullを返す
	            spyOn(window.localStorage, "getItem").and.returnValue(null);
	            bk.execYahooAuctionAPI('auctionID')
	                .fail(function (res) {
	                expect(res).toEqual({ error: 'failedGetYahooAppID' });
	                done();
	            });
	        });
	        it('空文字列', function (done) {
	            // アプリケーションID：空文字列を返す
	            spyOn(window.localStorage, "getItem").and.returnValue('');
	            bk.execYahooAuctionAPI('auctionID')
	                .fail(function (res) {
	                expect(res).toEqual({ error: 'failedGetYahooAppID' });
	                done();
	            });
	        });
	    });
	});
	describe('商品データ取得', function () {
	    var bk;
	    beforeEach(function () {
	        bk = new background_ts_1.default();
	    });
	    it('正常取得', function () {
	        spyOn(bk, 'execYahooAuctionAPI').and.callFake(function () {
	            var def = $.Deferred();
	            def.resolve({
	                // responseText: '"loaded({"ResultSet":{"@attributes":{"totalResultsAvailable":"1","totalResultsReturned":"1","firstResultPosition":"1"},"Result":{"AuctionID":"w133952496","CategoryID":"2084298982","CategoryFarm":"3","CategoryIdPath":"0,23632,23960,2084005067,2084298965,2084298978,2084298982","CategoryPath":"\u30aa\u30fc\u30af\u30b7\u30e7\u30f3 > \u5bb6\u96fb\u3001AV\u3001\u30ab\u30e1\u30e9 > \u643a\u5e2f\u96fb\u8a71\u3001\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3 > \u643a\u5e2f\u96fb\u8a71\u672c\u4f53 > \u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u672c\u4f53 > au > \u30bd\u30cb\u30fc\u30fb\u30a8\u30ea\u30af\u30bd\u30f3","Title":"au SOV32 Xperia Z5","Seller":{"Id":"bookoff2014","Rating":{"Point":"107788","TotalGoodRating":"108746","TotalNormalRating":"551","TotalBadRating":"958","IsSuspended":"false","IsDeleted":"false"},"ItemListURL":"http:\/\/auctions.yahooapis.jp\/AuctionWebService\/V2\/sellingList?sellerID=bookoff2014","RatingURL":"http:\/\/auctions.yahooapis.jp\/AuctionWebService\/V1\/ShowRating?id=bookoff2014"},"AuctionItemUrl":"http:\/\/page18.auctions.yahoo.co.jp\/jp\/auction\/w133952496","Img":{"Image1":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703156_3_1_14533790426085_24244.jpg","Image2":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703157_3_2_14533790426085_24244.jpg","Image3":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703158_3_3_14533790426085_24244.jpg","Image4":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703159_3_4_14533790426085_24244.jpg","Image5":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703160_3_5_14533790426085_24244.jpg","Image6":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703161_3_6_14533790426085_24244.jpg","Image7":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703162_3_7_14533790426085_24244.jpg","Image8":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703163_3_8_14533790426085_24244.jpg","Image9":"http:\/\/auctions.c.yimg.jp\/images.auctions.yahoo.co.jp\/image\/ra293\/users\/7\/1\/5\/8\/bookoff2014-imgbatch_aa1775605260-2672531772-2337790338-3414227901\/600x450-bookoff2014_20309l703164_3_9_14533790426085_24244.jpg"},"Initprice":"46549.00","Price":"46549.00","Quantity":"1","AvailableQuantity":"1","Bids":"0","HighestBidders":{"@attributes":{"totalHighestBidders":"0"},"IsMore":"false"},"ItemStatus":{"Condition":"used","Comment":"B\uff1a\u4e2d\u53e4\u30fb\u666e\u901a"},"ItemReturnable":{"Allowed":"false"},"StartTime":"2016-05-01T03:32:44+09:00","EndTime":"2016-05-02T22:32:10+09:00","Bidorbuy":"46549.00","TaxRate":"8","TaxinPrice":"50272.000000","TaxinBidorbuy":"50272.000000","IsBidCreditRestrictions":"false","IsBidderRestrictions":"true","IsBidderRatioRestrictions":"true","IsEarlyClosing":"false","IsAutomaticExtension":"true","IsOffer":"false","HasOfferAccept":"false","IsCharity":"false","Option":{"StoreIcon":"http:\/\/i.yimg.jp\/images\/auct\/template\/ui\/auc_mod\/ic_9031.gif","FreeshippingIcon":"http:\/\/i.yimg.jp\/images\/auct\/template\/ui\/auc_mod\/ic_free_shipping.png","BuynowIcon":"http:\/\/i.yimg.jp\/images\/auct\/template\/ui\/auc_mod\/ic_9008.gif","EasyPaymentIcon":"http:\/\/i.yimg.jp\/images\/pay\/icon_s16.gif","IsTradingNaviAuction":"false"},"Description":" \u30fb\u672c\u5546\u54c1\u306f\u5e97\u982d\u3068\u4f75\u58f2\u306b\u306a\u3063\u3066\u304a\u308a\u3001\u5546\u54c1\u306e\u7d1b\u5931\u3001\u307e\u305f\u306f\u5165\u672d\u4ee5\u524d\u306b\u5546\u54c1\u304c\u8ca9\u58f2\u3055\u308c\u3066\u3057\u307e\u3046\u53ef\u80fd\u6027\u304c\u5fa1\u5ea7\u3044\u307e\u3059<BR>\u521d\u671f\u5316\u6e08\u307f<BR>\u52d5\u4f5c\u78ba\u8a8d\u6e08\u307f<BR>\u6db2\u6676\u753b\u9762\u306b\u30b9\u30ea\u30ad\u30ba\u3042\u308a<BR>\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5229\u7528\u5236\u9650\u25b2<BR>\u4ed8\u5c5e\u54c1\u306a\u3057\u3001\u672c\u4f53\u306e\u307f<BR><BR>\u30ad\u30ba\u7b49\u306e\u72b6\u614b\u306b\u3064\u3044\u3066\u306f\u753b\u50cf\u306b\u3066\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044<BR><TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>    <TR>        <TD WIDTH=10 HEIGHT=111><\/TD>        <TD WIDTH=100% HEIGHT=111>            <TABLE BORDER=0 CELLPADDING=0 CELLSPACING=1 WIDTH=100% BGCOLOR=#bfbfbf>                <TR>                    <TD BGCOLOR=#fe9f4a HEIGHT=37>                        <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>                            <TR>                                <TD WIDTH=12 HEIGHT=1>&nbsp;<\/TD>                                <TD BGCOLOR=#fe9f4a><STRONG><FONT SIZE=2>IMEI\/MEID<\/FONT><\/STRONG><\/TD>                            <\/TR>                        <\/TABLE>                    <\/TD>                    <TD COLSPAN=2 BGCOLOR=#FFFFFF>                        <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>                            <TR>                                <TD WIDTH=12 HEIGHT=1>&nbsp;<\/TD>                                <TD><FONT SIZE=2>353667072830069<\/FONT><\/TD>                            <\/TR>                        <\/TABLE>                    <\/TD>                <\/TR>                <TR>                    <TD BGCOLOR=#ded9d5 HEIGHT=37>                        <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>                            <TR>                                <TD WIDTH=12 HEIGHT=1>&nbsp;<\/TD>                                <TD><STRONG><FONT SIZE=2>\u5229\u7528\u5236\u9650\u306e\u78ba\u8a8d\u306b\u3064\u3044\u3066<\/FONT><\/STRONG><\/TD>                            <\/TR>                        <\/TABLE>                    <\/TD>                    <TD COLSPAN=2 BGCOLOR=#FFFFFF>                        <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>                            <TR>                                <TD WIDTH=12 HEIGHT=1>&nbsp;<\/TD>                                <TD><FONT SIZE=2><A HREF=https:\/\/au-cs0.kddi.com\/FtHome TARGET=new>\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5229\u7528\u5236\u9650\u78ba\u8a8d\u30da\u30fc\u30b8<\/A><BR>\u203b\u5404\u30ad\u30e3\u30ea\u30a2\u306e\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u306b\u3066IMEI\u30fbMEID\u304b\u3089\u5229\u7528\u5236\u9650\u306e\u78ba\u8a8d\u304c\u51fa\u6765\u307e\u3059\u3002<BR>\u203bau\u306eLTE\u6a5f\u3088\u308a\u3082\u524d\u306e\u6a5f\u7a2e\u306f\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5229\u7528\u5236\u9650\u306e\u5bfe\u8c61\u3068\u306f\u306a\u308a\u307e\u305b\u3093<BR>\u203b\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u5229\u7528\u5236\u9650\u306e\u72b6\u614b\u306f\u3001\u968f\u6642\u5909\u66f4\u3055\u308c\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\uff08\u5165\u672d\u6642\u3068\u843d\u672d\u6642\u3067\u72b6\u614b\u304c\u7570\u306a\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\uff09<\/FONT><\/TD>                            <\/TR>                        <\/TABLE>                    <\/TD>                <\/TR>                <TR>                    <TD BGCOLOR=#ded9d5 HEIGHT=37>                        <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>                            <TR>                                <TD WIDTH=12 HEIGHT=1>&nbsp;<\/TD>                                <TD><STRONG><FONT SIZE=2>\u30c7\u30fc\u30bf\u6d88\u53bb\u306b\u3064\u3044\u3066<\/FONT><\/STRONG><\/TD>                            <\/TR>                        <\/TABLE>                    <\/TD>                    <TD COLSPAN=2 BGCOLOR=#FFFFFF>                        <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>                            <TR>                                <TD WIDTH=12 HEIGHT=1>&nbsp;<\/TD>                                <TD><FONT SIZE=2>\u5f53\u5e97\u3067\u306f\u5c02\u4efb\u306e\u30b9\u30bf\u30c3\u30d5\u304c\u3001\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u30a8\u30ea\u30a2\u5185\u3067\u3001\u5c02\u7528\u306e\u30c7\u30fc\u30bf\u30af\u30ea\u30fc\u30cb\u30f3\u30b0\u30bd\u30d5\u30c8\u3092\u4f7f\u3044\u4f5c\u696d\u3059\u308b\u306e\u3067\u3001\u500b\u4eba\u60c5\u5831\u4fdd\u8b77\u306e\u5bfe\u7b56\u3082\u30d0\u30c3\u30c1\u30ea\uff01\u5b89\u5fc3\u3057\u3066\u3054\u5229\u7528\u9802\u3051\u307e\u3059\u3002<\/FONT><\/TD>                            <\/TR>                        <\/TABLE>                    <\/TD>                <\/TR>            <\/TABLE>        <\/TD>        <TD WIDTH=10 HEIGHT=111><\/TD>    <\/TR><\/TABLE><BR><TABLE WIDTH=921 BORDER=0 CELLSPACING=0 CELLPADDING=0>    <TR>        <TD COLSPAN=7 HEIGHT=20><\/TD>    <\/TR>    <TR>        <TD WIDTH=10><\/TD>        <TD COLSPAN=5 ALIGN=LEFT><STRONG><FONT SIZE=3>\u72b6\u614b\u30e9\u30f3\u30af\u306b\u3064\u3044\u3066<\/FONT><\/STRONG><\/TD>    <\/TR>    <TR>        <TD COLSPAN=7 HEIGHT=5><\/TD>    <\/TR>    <TR>        <TD WIDTH=10><\/TD>        <TD WIDTH=100% ALIGN=CENTER>            <TABLE BORDER=0 CELLPADDING=0 CELLSPACING=1 WIDTH=100% BGCOLOR=#bfbfbf>                <TR>                    <TD ROWSPAN=2 BGCOLOR=#fe9f4a HEIGHT=60 ALIGN=center>                        <STRONG><FONT SIZE=2>\u65b0\u54c1<\/FONT><\/STRONG>                    <\/TD>                    <TD COLSPAN=4 BGCOLOR=#ded9d5 HEIGHT=25 ALIGN=center>                        <STRONG><FONT SIZE=2>\u4e2d\u53e4<\/FONT><\/STRONG>                    <\/TD>                <\/TR>                <TR>                    <TD BGCOLOR=#fed64a HEIGHT=35 ALIGN=center>                        <STRONG><FONT SIZE=2>\u72b6\u614bA<\/FONT><\/STRONG>                    <\/TD>                    <TD BGCOLOR=#b3e565 ALIGN=center>                        <STRONG><FONT SIZE=2>\u72b6\u614bB<\/FONT><\/STRONG>                    <\/TD>                    <TD BGCOLOR=#65dbe5 ALIGN=center><STRONG>                        <FONT SIZE=2>\u72b6\u614bC<\/FONT><\/STRONG>                    <\/TD>                    <TD BGCOLOR=#6598e5 ALIGN=center>                        <STRONG><FONT SIZE=2>\u305d\u306e\u4ed6<\/FONT><\/STRONG>                    <\/TD>                <\/TR>                <TR>                    <TD BGCOLOR=#ffffff HEIGHT=35 ALIGN=center>                        <FONT SIZE=2>\u65b0\u54c1\u672a\u4f7f\u7528<\/FONT>                    <\/TD>                    <TD BGCOLOR=#ffffff ALIGN=center>                        <FONT SIZE=2>\u7f8e\u54c1<\/FONT>                    <\/TD>                    <TD BGCOLOR=#ffffff ALIGN=center>                        <FONT SIZE=2>\u4e2d\u53e4\u666e\u901a<\/FONT>                    <\/TD>                    <TD BGCOLOR=#ffffff ALIGN=center>                        <FONT SIZE=2>\u82e5\u5e72\u96e3\u3042\u308a<\/FONT>                    <\/TD>                    <TD BGCOLOR=#ffffff ALIGN=center>                        <FONT SIZE=2>\u30b3\u30e1\u30f3\u30c8\u3092\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044<\/FONT>                    <\/TD>                <\/TR>            <\/TABLE>        <\/TD>    <\/TR><\/TABLE><TABLE WIDTH=921 BORDER=0 CELLSPACING=0 CELLPADDING=0>    <TR>        <TD COLSPAN=7 HEIGHT=20><\/TD>    <\/TR>    <TR>        <TD WIDTH=10><\/TD>        <TD COLSPAN=5 ALIGN=LEFT><STRONG><FONT SIZE=3>\u3054\u5165\u672d\u3059\u308b\u524d\u306b\u3054\u78ba\u8a8d\u3044\u305f\u3060\u304d\u305f\u3044\u3053\u3068<\/FONT><\/STRONG><\/TD>    <\/TR>    <TR>        <TD COLSPAN=7 HEIGHT=5><\/TD>    <\/TR>    <TR>        <TD WIDTH=10><\/TD>        <TD WIDTH=100% ALIGN=CENTER>            <TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>            <TR>                <TD ALIGN=center>                    <IMG SRC=http:\/\/www.bookoff.co.jp\/auc\/images\/s\/table_01.png WIDTH=921>                <\/TD>            <\/TR>            <TR>                <TD ALIGN=center>                    <IMG SRC=http:\/\/www.bookoff.co.jp\/auc\/images\/s\/table_02.png WIDTH=921>                <\/TD>            <\/TR>            <TR>                <TD ALIGN=center>                    <IMG SRC=http:\/\/www.bookoff.co.jp\/auc\/images\/s\/table_03.png WIDTH=921>                <\/TD>            <\/TR>            <\/TABLE>        <\/TD>    <\/TR><\/TABLE><BR><FONT COLOR=white>20309240500130000000<\/FONT><BR><BR><FONT COLOR=white><DIV>*0017429882<\/DIV><\/FONT> ","SeoKeywords":" \u30bd\u30cb\u30fc\u30fb\u30a8\u30ea\u30af\u30bd\u30f3,au,\u5bb6\u96fb\u3001AV\u3001\u30ab\u30e1\u30e9 ","Payment":{"EasyPayment":{"IsCreditCard":"true","IsNetBank":"true"},"Bank":{"@attributes":{"totalBankMethodAvailable":"2"},"Method":["\u4e09\u83f1\u6771\u4eacUFJ\u9280\u884c","\u30b8\u30e3\u30d1\u30f3\u30cd\u30c3\u30c8\u9280\u884c"]}},"BlindBusiness":"impossible","SevenElevenReceive":"impossible","ChargeForShipping":"seller","Location":"\u795e\u5948\u5ddd\u770c","IsWorldwide":"false","ShipTime":"after","Shipping":{"@attributes":{"totalShippingMethodAvailable":"1"},"Method":{"Name":"\u65e5\u672c\u90f5\u4fbf\u3000\u3086\u3046\u30d1\u30c3\u30af"}},"BaggageInfo":{"Size":"\uff0d","SizeIndex":{},"Weight":"\uff0d","WeightIndex":{}},"IsAdult":"false","IsCreature":"false","IsSpecificCategory":"false","IsCharityCategory":"false","CharityOption":{"Proportion":"0"},"AnsweredQAndANum":"0","Status":"open"}}})"'
	                responseText: '"loaded({"ResultSet":{"Result":{"CategoryPath":"カテゴリー", "Description":"商品説明"}}})"'
	            });
	            return def.promise();
	        });
	        bk.getSyohinData('auctionID', function (res) {
	            expect(res).toEqual({
	                result: true,
	                data: {
	                    syohinSetsumei: '商品説明',
	                    category: 'カテゴリー'
	                }
	            });
	        });
	    });
	    it('商品データ取得に失敗', function () {
	        spyOn(bk, 'execYahooAuctionAPI').and.callFake(function () {
	            var def = $.Deferred();
	            def.reject({
	                error: 'failedGetYahooAppID'
	            });
	            return def.promise();
	        });
	        bk.getSyohinData('auctionID', function (res) {
	            expect(res).toEqual({
	                result: false,
	                error: 'failedGetYahooAppID'
	            });
	        });
	    });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	/// <reference path="../../../../typings/main.d.ts"/>
	"use strict";
	// メッセージ(type)に応じて処理を振り分ける
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    var background = new Background();
	    if (request.type !== undefined) {
	        switch (request.type) {
	            // 利用制限チェックページを開く
	            case 'openSeigenPage':
	                background.openRiyoSeigenPage(request.data);
	                return true;
	            // 商品説明、カテゴリーなどの情報を取得
	            case 'getSyohinData':
	                background.getSyohinData(request.data.auctionID, sendResponse);
	                return true;
	            default:
	                throw new Error('存在しないメッセージタイプです!');
	        }
	    }
	    else {
	        throw new Error('メッセージタイプが指定されていません!');
	    }
	});
	var Background = (function () {
	    function Background() {
	    }
	    /**
	    * Yahoo!のアプリケーションIDを取得する
	    * @method LoadYahooAppID
	    * @return {String} アプリケーションID
	    */
	    Background.prototype.LoadYahooAppID = function () {
	        var yahooAppID = localStorage.getItem('yahooAppID');
	        return yahooAppID;
	    };
	    /**
	    * 利用制限チェックページを開く
	    * @method openRiyoSeigenPage
	    * @param data {Object} 必要な情報が入った配列（Carrer:キャリア, IMEI:IMEI）
	    */
	    Background.prototype.openRiyoSeigenPage = function (data) {
	        // 携帯電話利用制限確認ページURL
	        var IMEICheckURLs = {
	            NTTdocomo: 'http://nw-restriction.nttdocomo.co.jp/search.php',
	            au: 'https://au-cs0.kddi.com/FtHome',
	            softbank: 'https://ct11.my.softbank.jp/WBF/icv'
	        };
	        // 利用制限確認ページIMEI入力inputタグname属性名
	        var IMEIInputTagNames = {
	            NTTdocomo: 'productno',
	            au: 'IMEI',
	            softbank: 'imei'
	        };
	        chrome.windows.create({
	            url: IMEICheckURLs[data.Career],
	            type: 'popup',
	            width: 920,
	            height: 600
	        }, function (window) {
	            chrome.tabs.executeScript(window.tabs[0].id, { file: "bower_components/jquery/dist/jquery.min.js" }, function () {
	                chrome.tabs.executeScript(window.tabs[0].id, { code: '$(function() {$(\'input[name="' + IMEIInputTagNames[data.Career] + '"]\').val(' + data.IMEI + ');});' });
	            });
	        });
	    };
	    /**
	    * オークションの商品データ（説明、カテゴリーなど）を取得する
	    * @method getSyohinSetumei
	    * @param data {auctionID}  オークションID
	    * @return {Object} 商品データ http://developer.yahoo.co.jp/webapi/auctions/auction/v2/auctionitem.html
	    */
	    Background.prototype.getSyohinData = function (auctionID, sendResponse) {
	        console.group('商品説明取得');
	        console.log('オークションID:', auctionID);
	        this.execYahooAuctionAPI(auctionID)
	            .done(function (res) {
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
	            sendResponse({
	                result: true,
	                data: {
	                    syohinSetsumei: syohinSetsumei,
	                    category: category
	                }
	            });
	        })
	            .fail(function (res) {
	            console.error('商品説明の取得に失敗しました!');
	            sendResponse({
	                result: false,
	                error: res.error
	            });
	        });
	    };
	    /**
	    * Yahoo!オークションAPIを実行して、結果を取得する
	    * @method execYahooAuctionAPI
	    * @param auctionID {String} オークションID
	    * @return {Object} APIの実行結果
	    */
	    Background.prototype.execYahooAuctionAPI = function (auctionID) {
	        var deferred = $.Deferred();
	        var yahooAppID = this.LoadYahooAppID();
	        console.log('appID', yahooAppID);
	        if (yahooAppID !== null && yahooAppID !== '') {
	            $.ajax({
	                type: 'GET',
	                url: 'http://auctions.yahooapis.jp/AuctionWebService/V2/auctionItem',
	                dataType: 'json',
	                data: {
	                    appid: yahooAppID,
	                    output: 'json',
	                    auctionID: auctionID
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
	        }
	        else {
	            deferred.reject({
	                error: 'failedGetYahooAppID'
	            });
	        }
	        return deferred.promise(this);
	    };
	    return Background;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Background;
	// インストール時に説明ページを表示
	chrome.runtime.onInstalled.addListener(function (details) {
	    if (details.reason == "install") {
	        chrome.tabs.create({
	            url: chrome.extension.getURL('oninstall.html')
	        });
	    }
	});


/***/ }
/******/ ]);