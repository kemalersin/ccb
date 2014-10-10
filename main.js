const
    DELAY = 500,

    URL_LINK_PREEV = 'http://preev.com/xdg/eur',
    URL_LINK_CRYPTSY = 'https://www.cryptsy.com/markets/view/132',
    URL_LINK_BTCTURK = 'https://www.btcturk.com/Exchange/FastSellBtc',

    URL_JSON_BTCTURK = 'https://www.btcturk.com/api/ticker',
    URL_JSON_CRYPTSY = 'https://www.cryptsy.com/orders/ajaxorderslist2/132',
    URL_JSON_CURRENCY = 'http://api.piyasa.com/json/?kaynak=doviz_guncel_serb',
    URL_JSON_PREEV = 'http://preev.com/pulse/units:xdg+eur/sources:bter+cryptsy+bitfinex+bitstamp+btce+bter+cryptsy+kraken+localbitcoins+btce+kraken';

var timer;

var ccb = {
    addBox: function () {
        $('div.contentpanel div.row').append('' +
            '<div class="col-md-6">' +
            '   <div class="panel panel-default">' +
            '       <div class="panel-heading"><p>"Amount" alanına çevrilmesini istediğiniz tutarı giriniz</p></div>' +
            '       <div class="panel-body">' +
            '           <div class="row values">' +
            '               <div class="col-md-8">CoIntellect\'in verdiği Doge miktarı</div>' +
            '               <div class="col-md-4 text-right ci-doge-amount"><h3>&nbsp;</h3></div>' +
            '               <div class="col-md-8">Aynı ödemeyle piyasada alınabilecek Doge miktarı</div>' +
            '               <div class="col-md-4 text-right market-doge-amount"><h3>&nbsp;</h3></div>' +
            '               <div class="col-md-8">CoIntellect\'in verdiği Doge\'ların piyasa değeri (Euro)</div>' +
            '               <div class="col-md-4 text-right market-euro-price"><h3>&nbsp;</h3></div>' +
            '               <div class="col-md-8">CoIntellect\'in verdiği Doge\'ların Cryptsy değeri (BTC)</div>' +
            '               <div class="col-md-4 text-right cryptsy-btc-amount"><h3>&nbsp;</h3></div>' +
            '               <div class="col-md-8">CoIntellect\'in verdiği Doge\'ların BTCTurk değeri (TL)</div>' +
            '               <div class="col-md-4 text-right btcturk-tl-price"><h3>&nbsp;</h3></div>' +
            '               <div class="col-md-8">CoIntellect\'in verdiği Doge\'ların BTCTurk değeri (Euro)</div>' +
            '               <div class="col-md-4 text-right btcturk-euro-price"><h3>&nbsp;</h3></div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>' +
            '');
    },
    addAction: function () {
        $(document).keyup(function (event) {
            var el = event.target;

            if (el.id == 'CollectForm_amount') {
                window.clearTimeout(timer);

                timer = window.setTimeout(function() {
                    const values = 'div.values .text-right h3';

                    var ciEuro = parseFloat($(el).val()),
                        ciDoge = parseFloat($('#dcAmountInDogecoin').text());

                    $(values).html('&nbsp;<i class="fa fa-spinner fa-spin"></i>');

                    if (!ciDoge || isNaN(ciDoge)) {
                        $(values).html('&nbsp;');
                    }
<<<<<<< HEAD
                    else {
                        ciDoge = ciDoge.toFixed(4);

                        $.getJSON(URL_JSON_PREEV, function (data) {
                            var btcDogeRate = parseFloat(data.xdg.btc.bter.last);
                            var btceEuroRate = parseFloat(data.eur.btc.btce.last);
                            var krakenEuroRate = parseFloat(data.eur.btc.kraken.last);

                            var btcEuroRate = (btceEuroRate + krakenEuroRate) / 2;
                            var dogeEuroRate = btcDogeRate / btcEuroRate;

                            var marketDoge = (ciEuro / dogeEuroRate).toFixed(4);
                            var marketEuro = (ciDoge * dogeEuroRate).toFixed(4);

                            $.getJSON(URL_JSON_CRYPTSY, function (data) {
                                var cryptsyBtc = 0,
                                    satoshi = data.buy[15][0];

                                cryptsyBtc = (ciDoge * satoshi).toFixed(8);
                                cryptsyBtc -= cryptsyBtc / 100 * .25;
                                cryptsyBtc = cryptsyBtc.toFixed(8);

                                $.getJSON(URL_JSON_BTCTURK, function (data) {
                                    var bid = data.Bid;
                                    var btcTurkTry = ((cryptsyBtc - 0.001) * bid).toFixed(4);

                                    $.getJSON(URL_JSON_CURRENCY, function (data) {
                                        var currEuroRate = $.grep(data, function (e){
                                            return e.foex == 'EUR';
                                        })[0].buy;

                                        var btcTurkEuro = (btcTurkTry / currEuroRate).toFixed(4);

                                        $('div.ci-doge-amount h3').text(ciDoge);

                                        $('div.market-doge-amount h3').html('<a href="' + URL_LINK_PREEV + '" target="_blank">' + marketDoge + '</a>');
                                        $('div.market-euro-price h3').html('<a href="' + URL_LINK_PREEV + '" target="_blank">€ ' + marketEuro + '</a>');
                                        $('div.cryptsy-btc-amount h3').html('<a href="' + URL_LINK_CRYPTSY + '" target="_blank">฿ ' + cryptsyBtc + '</a>');
                                        $('div.btcturk-tl-price h3').html('<a href="' + URL_LINK_BTCTURK + '" target="_blank">₺ ' + btcTurkTry + '</a>');
                                        $('div.btcturk-euro-price h3').html('<a href="' + URL_LINK_BTCTURK + '" target="_blank">€ ' + btcTurkEuro + '</a>');
                                    });
                                });
                            });
                        });
=======
                }
                else {
                    var dcAmountInDogecoin = document.getElementById('dcAmountInDogecoin');
                    var doge = parseFloat(dcAmountInDogecoin.innerText) - 1;

                    if (!isNaN(doge)) {
                        var tl = 0;
                        var sato = data['132'];
                        var btc = (doge * sato).toFixed(8);

                        btc -= btc / 100 * .25;
                        btc = btc.toFixed(8);

                        tl = ((btc - 0.001) * bid).toFixed(2);

                        dcAmountInDogecoin.innerHTML +=
                            '<br />' +
                            '<span id="dcAmountInTL" style="color: #428bca;">' +
                            btc + ' BTC<br />' +
                            tl + ' TL' +
                            '</span>';
>>>>>>> 6d42f2859017a5ccad164612c7bcbd77f4ab64fb
                    }
                }, DELAY);
            }
        });
    },
    init: function () {
        this.addBox();
        this.addAction();
    }
};

<<<<<<< HEAD
ccb.init();
=======
cryptsy.send();
>>>>>>> 6d42f2859017a5ccad164612c7bcbd77f4ab64fb
