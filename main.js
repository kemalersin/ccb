var bid = 0;
var tradeVersion = Date.now();

var cryptsy = new XMLHttpRequest;
var btcTurk = new XMLHttpRequest;

btcTurk.open('GET', 'https://www.btcturk.com/api/ticker?' + tradeVersion, false);
cryptsy.open('GET', 'https://www.cryptsy.com/trades/ajaxlasttrades?' + tradeVersion, false);

btcTurk.onreadystatechange = function () {
    if (btcTurk.readyState == 4 && btcTurk.status == 200) {
        var data = JSON.parse(btcTurk.responseText);
        bid = data.Bid;
    }
}

cryptsy.onreadystatechange = function () {
    if (cryptsy.readyState == 4 && cryptsy.status == 200) {
        var data = JSON.parse(cryptsy.responseText);

        btcTurk.send();

        document.addEventListener('keyup', function (event) {
            var el = event.srcElement;

            if (el.id == 'CollectForm_amount') {
                if (!el.value) {
                    var dcAmountInTL = document.getElementById('dcAmountInTL');

                    if (dcAmountInTL) {
                        dcAmountInTL.remove();
                    }
                }
                else {
                    var dcAmountInDogecoin = document.getElementById('dcAmountInDogecoin');
                    var doge = parseFloat(dcAmountInDogecoin.innerText.replace('Doge', '').trim()) - 1;

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
                    }
                }
            }
        }, false);
    }
};

cryptsy.send();