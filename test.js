const express = require('express');
const app = express();
var request = require("request")
var bodyParser = require('body-parser')
app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));
const Binance = require('binance-api-node').default
var sleep2 = require('system-sleep')
const binance = Binance({
    apiKey: '',
    apiSecret: ''
})
var ccxt = require("ccxt")
const {
    PublicClient
} = require("@okfe/okex-node");
const {
    V3WebsocketClient
} = require("@okfe/okex-node");
const {
    AuthenticatedClient
} = require("@okfe/okex-node");
const pClient = new PublicClient();
const wss = new V3WebsocketClient();
wss.connect();

var _ = require("underscore")

var moment = require("moment");


const WebSocket = require('ws');

wss.on('open', function open() {
    //console.log('opened!');

});
var asks = []
var bids = []
const bfx = require('./bfx.js')
const ws2 = bfx.ws(2, {
    transform: true
})

const rest = bfx.rest(2, {});
 let keys = []
  let keys2 = []
            rest.symbols().then(symbols => {
        for (var s in symbols) {
            //console.log('t' + symbols[s].toUpperCase());
            if (symbols[s].toUpperCase().slice(-3) == "ETH" || symbols[s].toUpperCase().slice(-3) == "BTC" || symbols[s].toUpperCase().slice(-3) == "USD") {
                keys.push('trade:1m:t' + symbols[s].toUpperCase());

                keys2.push('t' + symbols[s].toUpperCase());



            }
        }
})
wss.on('message', function incoming(data) {
    try {
        for (var v in JSON.parse(data).data) {
            if (JSON.parse(data).data[v].last) {
                var symbol = JSON.parse(data).data[v].instrument_id.replace('-', '')
                if (asks[symbol] == undefined) {
                    asks[symbol] = []
                    bids[symbol] = []
                }
                if (asks[symbol]['okex'] == undefined) {
                    asks[symbol]['okex'] = JSON.parse(data).data[v].best_ask;
                    bids[symbol]['okex'] = JSON.parse(data).data[v].best_bid;
                }
                asks[symbol]['okex'] = JSON.parse(data).data[v].best_ask;
                bids[symbol]['okex'] = JSON.parse(data).data[v].best_bid;
            }
        }

        gogo['okexTrades'] = true
    } catch (err) {

    }
});


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'ejs');
var MongoClient = require('mongodb').MongoClient;

app.listen(process.env.PORT || 8080, function() {});

var sortBy = (function() {
    var toString = Object.prototype.toString,
        // default parser function
        parse = function(x) {
            return x;
        },
        // gets the item to be sorted
        getItem = function(x) {
            var isObject = x != null && typeof x === "object";
            var isProp = isObject && this.prop in x;
            return this.parser(isProp ? x[this.prop] : x);
        };

    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby(array, cfg) {
        if (!(array instanceof Array && array.length)) return [];
        if (toString.call(cfg) !== "[object Object]") cfg = {};
        if (typeof cfg.parser !== "function") cfg.parser = parse;
        cfg.desc = !!cfg.desc ? -1 : 1;
        return array.sort(function(a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
        });
    };

}());
var gogo = []
var msg = "";

var result3 = []
var result4 = []
var result5 = []
var result6 = []
var result7 = []
var result8 = []
var result9 = []
var result10 = []
var result11 = []
var result12 = []
var result13 = []
var result14 = []

app.post('/', (req, res) => {
    doPost(req, res);

});
// See 'options' reference below
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let avgBids = {}
let avgAsks = {}
setInterval(function(){


for (var b in bids) {
	let total = 0;
	let c = 0;
	for( var ex in bids[b]){
		total+=parseFloat(bids[b][ex])
		c++;
	}
	avgBids[b] = total / c

	total = 0;
	c = 0;
	for( var ex in asks[b]){
		total+=parseFloat(asks[b][ex])
		c++;
	}
	avgAsks[b] = total / c
}
console.log(avgs)
}, 15000)
setTimeout(async function() {


    for (var p in pairs) {

        wss.subscribe("spot/ticker:" + pairs[p].replace('/', '-'));
        sleep2(2)
        doOthers({
            symbol: pairs[p]
        });
    }

}, 10000);
let pairs = []
binance.ws.allTickers(tickers => {
    for (var t in tickers) {
        if (asks[tickers[t].symbol] == undefined) {
            asks[tickers[t].symbol] = {}
            bids[tickers[t].symbol] = {}
        }
        let pair;
        if (tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length).startsWith('USD')) {
            pair = tickers[t].symbol.substring(0, tickers[t].symbol.length - 4) + '/' + tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length);
        } else {
            pair = tickers[t].symbol.substring(0, tickers[t].symbol.length - 3) + '/' + tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length);

        }
        if (!pairs.includes(pair)) {
            pairs.push(pair);
        }
        asks[tickers[t].symbol]['binance'] = tickers[t].bestAsk
        bids[tickers[t].symbol]['binance'] = tickers[t].bestBid
    }
})

async function doOthers(mv) {

    var pair = mv.symbol.replace('/', '')
    if (pair.slice(-3) == "USD") {
        pair += "T"
    }
    var ts = Math.round(new Date().getTime() / 1000);
    var tsYesterday = ts - (0.005 * 3600);

    if (pair == "BTCUSDT") {
        var p = "XBTUSD";
    } else {
        var p = pair;
    }
    var opts = {
        'symbol': p,
        'startTime': moment(tsYesterday * 1000).format()
    };
    //console.log(opts);

    var pd = pair.split('/')[0]
    if (pd.slice(-3) == "USD") {
        pd += "T"
    }
    //console.log(pd);
   
    try {
        var p;
        if (pair == "BTC/USDT") {
            p = 'btc_usdt';
        } else {
            p = pair


        }
        
    } catch (err) { ////console.log(err); gogo['okexTrades'] = true;
    }

    try {

        if (pair.slice(-4) == "USDT") {
            var p = pair.substr(0, pair.length - 1).split('/')[0];
        } else {
            var p = pair.split('/')[0];
        }
 
            if (keys2.includes('t' + p)){
        ws2.subscribeTicker("t" + p)
    }


    } catch (err) {
        gogo['bitfinexTrades'] = true;
    }
}
ws2.onTicker({}, (ticker) => {
    var p = ticker.symbol.substr(1, ticker.symbol.length)
    if (p.slice(-3) == 'USD') {
        p += "T"
    }
    if (asks[p] == undefined) {
        asks[p] = []
        bids[p] = []
    }
    asks[p]['bitfinex'] = ticker.ask
    bids[p]['bitfinex'] = ticker.bid
    gogo['bitfinexTrades'] = true;

})
ws2.open()
var done = []