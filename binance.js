const Binance = require('binance-api-node').default
var PortfolioAnalytics = require('portfolio-analytics');
var sleep2 = require('system-sleep')

var request = require("request")
var bodyParser = require('body-parser')
const express = require('express');
const app = express();
const client = Binance({
    apiKey: 'Jl5t0Uz4P6thkavAzVc4QwbaOHDBn9bswrbTaaOrkA5nHhbPYL6GSni5h8Gzz9os',
    apiSecret: 'QTL5QO6lPpxCodCutELOXRo29R6FMrHhXQ9lvmoyAllamDiJHN88s9eKJ9VeVfNJ'
})


let targetSpread = 0.55;
let targetVolDiv = 5;
let targetVolMult = 20;
let maxOrder = 1500;
let maxBetterVol = 1.5;
let neversellataloss = true;
let stoploss = 0.88;
let neversellatalossReductionIntervalMinutes = 10;


let msg;

let returnPortfolio;
let benchmark;
let zeroRisk;
let sharpe;
const binance = Binance({
    apiKey: '',
    apiSecret: ''
})
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

app.listen(process.env.PORT || 8081, function() {});

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
for (var symbol in divisor){
    divisor[symbol] = divisor[symbol] * 1.0001
buyOs[symbol] = buyOs[symbol] / divisor[symbol]
}
}, 60 * neversellatalossReductionIntervalMinutes  * 1000)
setInterval(function(){


for (var b in bids) {
    let total = 0;
    let c = 0;
    for( var ex in bids[b]){
        total+=parseFloat(bids[b][ex])
        c++;
    }
    avgBids[b] = total / c
if (divisor[b] != undefined){
//buyOs[b] = buyOs[b] / divisor[b]
}
    total = 0;
    c = 0;
    for( var ex in asks[b]){
        total+=parseFloat(asks[b][ex])
        c++;
    }
    avgAsks[b] = total / c
}
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

setInterval(function(){
      doSharpe();

}, 60 * 1000);

async function doSharpe(){
    rdiffs.push(rdiff)
      retdiffs.push(retdiff)
    console.log(rdiff)
      // Build the equity curves corresponding to the returns
      returnPortfolio = new Array(retdiffs.length +1);
      benchmark = new Array(rdiffs.length +1 );
      zeroRisk = new Array(rdiffs.length +1);

        returnPortfolio[0] = retdiffs[0];
        benchmark[0] = rdiffs[0];
        zeroRisk[0] = rdiffs[0];
      for (var i=0; i<retdiffs.length; ++i) {
        returnPortfolio[i+1] = returnPortfolio[i] * (1 + retdiffs[i]);
        benchmark[i+1] = benchmark[i] * (1 + rdiffs[i]);
        zeroRisk[i+1] = zeroRisk[i];
      }
      sharpe = PortfolioAnalytics.sharpeRatio(returnPortfolio, benchmark)
      console.log('sharpe: ' + sharpe)
}
setTimeout(function(){
    doSharpe();
}, 20000)

setTimeout(function(){
    doSharpe();
}, 24000)



app.get('/update', (req, res) => {

    doPost(req, res)

})

app.get('/', (req, res) => {
    doPost(req, res)

})
app.post('/', (req, res) => {
    doPost(req, res)

})
let maxbal = 50;
let total2 = 0;
let bnbtotal = 0;
let btctotal = 0;
let trades2 = []
let tradeids = []
let totalbefore = 0;
async function getTrades(){
    let gos = {}
        let avgs = {}
        for (var v in vols) {
            avgs[v] = vols[v] / cs[v];
        }
        for (var a in avgs) {
            if (a != 'USDS') {
                for (var t in tickVols) {

                    if (t.substring(t.length - 3, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            gos[a][(t)] = tickVols[t];
                        }
                    } else if (t.substring(t.length - 4, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            gos[a][(t)] = tickVols[t];
                        }
                    }

                }
            }
        }
        
        for (var g in gos){

            for (var symbol in gos[g]){
        let trades = (await client.myTrades({
          symbol: symbol,
        }))
        for (var t in trades){
            if (!tradeids.includes(trades[t].id)){
                tradeids.push(trades[t].id);
            
            trades2.push({'symbol': symbol, 'price': trades[t].price, 'isBuyer': trades[t].isBuyer, 'time': trades[t].time})
        }
        }
    }
}
}
setTimeout(function(){

getTrades();
}, 10000)
setInterval(function(){
    getTrades()
}, 60 * 1001)
async function doPost(req, res) {
    
    console.log(total2)
    total2 = 0;
    let bals2 = {}
    balances = (await client.accountInfo()).balances
    for (var b in balances) {
        bals2[balances[b].asset] = parseFloat(balances[b].free) + parseFloat(balances[b].locked)
    }
    total2 = 0;
    bnbtotal = 0;
    btctotal = 0;
    //console.log(bals2)
    for (var bal in bals2){
                    // console.log(parseFloat(bals2[bal]))
                    if (bals2[bal] > 0.00001){
                    total2 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])
               }
    
    }
    if (true){

    btctotal = total2 / btcs['BTC'];
    bnbtotal = total2 / btcs['BNB'] / btcs['BTC']
    totalbefore = total2;
    if (req.query.name) {
        res.json({
            total: total2,
            btc: btctotal,
            bnb: bnbtotal,
            trades2: trades2
        });

    } else {
        res.render('binance.ejs', {
            name: "",
            json: {},
            avgAsk: {},
            msg: "",
            trades: []
        })
    }
}
    total2 = 0;
}
let ticks = []
let bases = []
let vols = {}
let cs = {}
let tickVols = {}
let spreads = {}
let btcs = {}
let btcs2 = {}
client.ws.allTickers(tickers => {
    for (var t in tickers) {
        for (var b in bases) {
            if (tickers[t].symbol == bases[b] + 'BTC') {
                btcs[bases[b]] = tickers[t].bestBid;
            }
        }
        if (tickers[t].symbol == 'BTCUSDT') {
            for (b in btcs) {
                btcs2[b] = btcs[b] * tickers[t].bestBid;
            }
            btcs['BTC'] = parseFloat(tickers[t].bestBid);
        }
        let symbol = tickers[t].symbol;
        let asset;
        if (symbol.substring(symbol.length - 3, symbol.length) == 'BTC') {

            asset = symbol.substring(0, symbol.length - 3)



        }
        if (!bases.includes(asset)) {
            btcs[asset] = parseFloat(tickers[t].bestBid)
        }
        let spread = (100 * (1 - parseFloat(tickers[t].bestBid) / parseFloat(tickers[t].bestAsk)))
        if (!ticks.includes(tickers[t].symbol) && spread) {
            spreads[tickers[t].symbol] = spread;
            tickVols[tickers[t].symbol] = (parseFloat(tickers[t].volumeQuote))
            if (tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length).includes('USD')) {
                if (!bases.includes(tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length))) {
                    bases.push(tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length))
                }
            } else {
                if (!bases.includes(tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length))) {
                    bases.push(tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length))
                }
            }
            ticks.push(tickers[t].symbol)
            for (var t in tickers) {
                for (b in bases) {
                    if (vols[bases[b]] == undefined) {
                        vols[bases[b]] = 0;
                        cs[bases[b]] = 0;
                    }
                    if (tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length) == bases[b]) {
                        vols[bases[b]] += (parseFloat(tickers[t].volumeQuote));
                        cs[bases[b]]++;
                    } else if (tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length) == bases[b]) {
                        vols[bases[b]] += (parseFloat(tickers[t].volumeQuote));
                        cs[bases[b]]++;
                    }
                }

            }

        }
    }
})
askOrders = {}
bidOrders = {}
let notabuys = []
let count = 1;
let lala = 0;
let selling = {}
let precisions = {}
let filters = {}
async function cancelAll() {
    try {
        let gos = {}
        let avgs = {}
        for (var v in vols) {
            avgs[v] = vols[v] / cs[v];
        }
        for (var a in avgs) {
            if (a != 'USDS') {
                for (var t in tickVols) {

                    if (t.substring(t.length - 3, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            gos[a][(t)] = tickVols[t];
                        }
                    } else if (t.substring(t.length - 4, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            gos[a][(t)] = tickVols[t];
                        }
                    }

                }
            }
        }
        let dont = []
        for (var sym in ticks) {

            for (var g in gos) {
                for (var symbol in gos[g]) {
                    if (symbol == sym) {
                        dont.push(symbol)
                    }
                }
            }
        }
        balances = (await client.accountInfo()).balances
        for (var b in balances) {
            bals[balances[b].asset] = parseFloat(balances[b].free)
        }
        for (var bal in bals) {
            let book;
            if (bal != 'BTC' && bal != 'USDS' && bal != 'ETH' && bal != 'BNB' && bals[bal] != 0) {
                if (!bases.includes(bal)) {
                    let symbol = bal + 'BNB';
                    if (true) {
                        try {
                            book = (await client.book({
                                symbol: symbol
                            }))
                        } catch (err) {
                            symbol = bal + 'BTC';
                            try {
                                book = (await client.book({
                                    symbol: symbol
                                }))
                            } catch (err) {
                                symbol = bal + 'ETH';
                                book = (await client.book({
                                    symbol: symbol
                                }))
                            }
                        }
                    }
                    if (!dont.includes(symbol)) {
                        let orders = (await client.openOrders({
                            symbol: symbol,
                        }))

                        for (var o in orders) {
                            console.log(orders[o])
                            console.log('cancel')
                            console.log(await client.cancelOrder({
                                symbol: symbol,
                                orderId: orders[o].orderId,
                            }))


                        }
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}
cancelAll();
setInterval(function() {
    cancelAll();
}, 60 * 1000 * 4 * 4)
async function doit() {
    notabuys = []
    try {
        let exchange = (await client.exchangeInfo())
        for (var symbol in exchange.symbols) {
            precisions[exchange.symbols[symbol].symbol] = {
                'base': exchange.symbols[symbol].baseAsset,
                'quote': exchange.symbols[symbol].quoteAsset,
                'bp': exchange.symbols[symbol].baseAssetPrecision,
                'qp': exchange.symbols[symbol].quotePrecision
            }
            filters[exchange.symbols[symbol].symbol] = {
                'minPrice': parseFloat(exchange.symbols[symbol].filters[0].minPrice),
                'minQty': parseFloat(exchange.symbols[symbol].filters[2].minQty),
                'tickSize': countDecimalPlaces(parseFloat(exchange.symbols[symbol].filters[0].tickSize)),
                'stepSize': countDecimalPlaces(parseFloat(exchange.symbols[symbol].filters[2].stepSize)),
                'minNotional': parseFloat(exchange.symbols[symbol].filters[3].minNotional)
            }
        }
        let balances = (await client.accountInfo()).balances
        for (var b in balances) {
            bals[balances[b].asset] = parseFloat(balances[b].free)
        }
        let gos = {}
        let avgs = {}
        for (var v in vols) {
            avgs[v] = vols[v] / cs[v];
        }
        for (var a in avgs) {
            if (a != 'USDS') {
                for (var t in tickVols) {

                    if (t.substring(t.length - 3, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            gos[a][(t)] = tickVols[t];
                        }
                    } else if (t.substring(t.length - 4, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            gos[a][(t)] = tickVols[t];
                        }
                    }

                }
            }
        }
        console.log(gos);
        let dont = []
        for (var sym in ticks) {

            for (var g in gos) {
                for (var symbol in gos[g]) {
                    if (symbol == sym) {
                        dont.push(symbol)
                    }
                }
            }
        }

        for (var symbol in stopp) {
            if (true) {
                //console.log('2 ' + symbol)
                //testing
                //console.log(symbol)
                if (true) { //if (symbol == "GNTBNB"){
                    let book = (await restClient.getOrderBook(symbol))
                    let hb = 0;
                    let hbless = 0;
                    let laless = 0;
                    for (var bid in book.bids) {
                        if (parseFloat(book.bids[bid].price) > hb) {
                            hbless = hb;
                            hb = parseFloat(book.bids[bid].price);
                        }
                    }
                    let la = 50000000000000000000000;
                    for (var ask in book.asks) {
                        if (parseFloat(book.asks[ask].price) < la) {
                            laless = la;
                            la = parseFloat(book.asks[ask].price)
                        }
                    }
                    let orders = (await restClient.getMyActiveOrders()).orders
                        for (var o in orders){
                            if (orders[o].symbol == symbol && orders[o].side == 'sell'){
                                 console.log(await restClient.cancelOrder({
                                    clientOrderId: orders[o].clientOrderId,
                                }))
                            }
                        }
                        balances = (await restClient.getMyBalance()).balance
                        for (var b in balances) {
                            if (b == 'BTC' || b == 'ETH' || b.startsWith('USD')){

                            bals[b] = parseFloat(balances[b].cash) + parseFloat(balances[b].reserved)
                            }
                            bals[b] = parseFloat(balances[b].cash)
                        }
                        
                            asset = symbol.substring(0, symbol.length - 3)

                        //console.log('asset: ' + asset)

                        if (true) {
                            if (lala == 0) {
                                ////console.log(precisions[symbol]);
                                ////console.log(filters[symbol])
                                ////console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001)).toFixed(filters[symbol].stepSize - 1));
                                  bp = (hb * 1.0001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .9999)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                                    //console.log('sp: ' + sp)
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / (Object.keys(gos[g]).length / 4)).toFixed(filters[symbol].stepSize - 1));
                                let dontgo = false;
                                let sellQty = (parseFloat(bals[asset]) * 0.995).toFixed(filters[symbol].stepSize - 1)
                                sellQty = sellQty * 1000
                                //console.log(sellQty)
                                //console.log(filters[symbol].minNotional)
                                if ((sellQty) * hb * 1.0001 < filters[symbol].minNotional) {
                                    //console.log('dontgo minnotional ' + symbol)
                                    dontgo = true;
                                }
                                if (sellQty < filters[symbol].minQty) {

                                    //console.log('dontgo minqty ' + symbol)
                                    dontgo = true;
                                }
                                
                                if (sp < stopp[symbol]) {
                                    //lala++;
                                    try {
                                        /* buys.push(await client.order({
                  symbol: symbol,
                  side: 'buy',
                  quantity: buyQty,
                  price: bp,
                })) */
                //console.log('sellQty: ' + sellQty)
                                        console.log(await client.order({
                                            symbol: symbol,
                                            side: 'SELL',
                                            quantity: sellQty,
                                            type: 'MARKET'
                                        }))
                                        console.log({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        })
                                        //console.log(order)
                                        //console.log(buys);
                                        //console.log(sells);
                                    } catch (err) {

                                        //console.log(err);
                                    }
                                    las[symbol] = la;
                                    hbs[symbol] = hb;
                                }

                            }

                        }
                    
                    /*

                     */
                }
            }
        }

        for (var g in gos) {
            for (var symbol in gos[g]) {
                console.log('2 ' + symbol)
                //testing
                console.log(symbol)
                if (true) { //if (symbol == "GNTBNB"){
                    let book = (await client.book({
                        symbol: symbol
                    }))
                    let hb = 0;
                    let hbless = 0;
                    let laless = 0;
                    for (var bid in book.bids) {
                        if (parseFloat(book.bids[bid].price) > hb) {
                            hbless = hb;
                            hb = parseFloat(book.bids[bid].price);
                        }
                    }
                    let la = 50000000000000000000000;
                    for (var ask in book.asks) {
                        if (parseFloat(book.asks[ask].price) < la) {
                            laless = la;
                            la = parseFloat(book.asks[ask].price)
                        }
                    }
                    //console.log(symbol + ' la: ' + la + ' hb: ' + hb)
                    if (symbol != 'BNBUSDS' && (hblesss[symbol] != hbless || lalesss[symbol] != laless) || (las[symbol] != la && hbs[symbol] != hb)) {
                        hblesss[symbol] = hbless
                        lalesss[symbol] = laless
                        let orders = (await client.openOrders({
                            symbol: symbol,
                        }))

                        for (var o in orders) {
                            console.log(orders[o])
                            console.log('cancel')
                            console.log(await client.cancelOrder({
                                symbol: symbol,
                                orderId: orders[o].orderId,
                            }))


                        }
                        balances = (await client.accountInfo()).balances
                        for (var b in balances) {
                            bals[balances[b].asset] = parseFloat(balances[b].free)
                        }
                        if (symbol.substring(symbol.length - 4, symbol.length) == g) {

                            asset = symbol.substring(0, symbol.length - 4)
                        } else {
                            asset = symbol.substring(0, symbol.length - 3)


                        }
                        console.log('asset: ' + asset)

                        if (bals[asset] != 0) {
                            if (lala == 0) {
                                //console.log(precisions[symbol]);
                                //console.log(filters[symbol])
                                //console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001)).toFixed(filters[symbol].stepSize - 1));
                                bp = (hb * 1.0001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .9999)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / Object.keys(gos[g]).length).toFixed(filters[symbol].stepSize - 1));
                                let dontgo = false;
                                let sellQty = (parseFloat(bals[asset]) * 0.995).toFixed(filters[symbol].stepSize - 1)
                                console.log(sellQty)
                                console.log(filters[symbol].minNotional)
                                if ((sellQty) * hb * 1.0001 < filters[symbol].minNotional) {
                                    console.log('dontgo minnotional ' + symbol)
                                    dontgo = true;
                                }
                                if (sellQty < filters[symbol].minQty) {

                                    console.log('dontgo minqty ' + symbol)
                                    dontgo = true;
                                }
                                //console.log(bp)
                                
                                if ((neversellataloss == true && ((sp < buyOs[symbol])))){
                                    dontbuy[symbol] = true;
                                }
                                if (dontgo == false && (neversellataloss == true && sp > buyOs[symbol])) {

                                    //lala++;
                                    try {
                                        /* buys.push(await client.order({
                  symbol: symbol,
                  side: 'BUY',
                  quantity: buyQty,
                  price: bp,
                })) */
                                        console.log(await client.order({
                                            symbol: symbol,
                                            side: 'SELL',
                                            quantity: sellQty,
                                            price: sp,
                                        }))
                                        console.log(buys);
                                        console.log(sells);
                                    } catch (err) {

                                        console.log(err);
                                    }
                                    las[symbol] = la;
                                    hbs[symbol] = hb;
                                }

                            }

                        }
                    }
                    /*

                     */
                }
            }
        }
        console.log('wololo')
        balances = (await client.accountInfo()).balances
        for (var b in balances) {
            bals[balances[b].asset] = parseFloat(balances[b].free)
        }

        for (var bal in bals) {
            let book;
            if (bal != 'BTC' && bal != 'USDS' && bal != 'ETH' && bal != 'BNB' && bals[bal] != 0) {
                if (!bases.includes(bal)) {
                    let symbol = bal + 'BNB';
                    console.log(symbol)
                    if (true) {
                        console.log(bal)
                        try {
                            book = (await client.book({
                                symbol: symbol
                            }))
                        } catch (err) {
                            symbol = bal + 'BTC';
                            console.log(symbol)
                            try {
                                book = (await client.book({
                                    symbol: symbol
                                }))
                            } catch (err) {
                                symbol = bal + 'ETH';
                                console.log(symbol)
                                book = (await client.book({
                                    symbol: symbol
                                }))
                            }
                        }
                    }
                    console.log(dont);
                    if (!dont.includes(symbol)) {
                        let hb = 0;
                        let hbless = 0;
                        let laless = 0;
                        for (var bid in book.bids) {
                            if (parseFloat(book.bids[bid].price) > hb) {
                                hbless = hb;
                                hb = parseFloat(book.bids[bid].price);
                            }
                        }
                        let la = 50000000000000000000000;
                        for (var ask in book.asks) {
                            if (parseFloat(book.asks[ask].price) < la) {
                                laless = la;
                                la = parseFloat(book.asks[ask].price)
                            }
                        }
                        //console.log(symbol + ' la: ' + la + ' hb: ' + hb)
                        if (symbol != 'BNBUSDS' && (selling[symbol] == false) || ((hblesss[symbol] != hbless || lalesss[symbol] != laless) || (las[symbol] != la && hbs[symbol] != hb))) {
                            selling[symbol] = true;
                            hblesss[symbol] = hbless
                            lalesss[symbol] = laless
                            let orders = (await client.openOrders({
                                symbol: symbol,
                            }))

                            for (var o in orders) {
                                console.log(orders[o])
                                console.log('cancel')
                                console.log(await client.cancelOrder({
                                    symbol: symbol,
                                    orderId: orders[o].orderId,
                                }))


                            }
                            balances = (await client.accountInfo()).balances
                            for (var b in balances) {
                                bals[balances[b].asset] = parseFloat(balances[b].free)
                            }
                            if (symbol.substring(symbol.length - 4, symbol.length) == g) {

                                asset = symbol.substring(0, symbol.length - 4)
                            } else {
                                asset = symbol.substring(0, symbol.length - 3)


                            }
                            console.log('asset: ' + asset)

                            if (bals[asset] != 0) {
                                if (lala == 0) {
                                    //console.log(precisions[symbol]);
                                    //console.log(filters[symbol])
                                    //console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001)).toFixed(filters[symbol].stepSize - 1));
                                    bp = (hb * 1.0001)
                                    bp = bp.toFixed(filters[symbol].tickSize - 1)
                                    sp = (la * .9999)
                                    sp = sp.toFixed(filters[symbol].tickSize - 1)
                                    buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / Object.keys(gos[g]).length).toFixed(filters[symbol].stepSize - 1));
                                    let dontgo = false;
                                    let sellQty = (parseFloat(bals[asset]) * 0.995).toFixed(filters[symbol].stepSize - 1)
                                    console.log(sellQty)
                                    console.log(filters[symbol].minNotional)
                                    if ((sellQty) * hb * 1.0001 < filters[symbol].minNotional) {
                                        console.log('dontgo minnotional ' + symbol)
                                        dontgo = true;
                                    }
                                    if (sellQty < filters[symbol].minQty) {

                                        console.log('dontgo minqty ' + symbol)
                                        dontgo = true;
                                    }
                                    //console.log(buyQty)
                                    //console.log(bp)
                                    
                                if ((neversellataloss == true && ((sp < buyOs[symbol])))){
                                    dontbuy[symbol] = true;
                                }
                                    if (dontgo == false && (neversellataloss == true && sp > buyOs[symbol])) {

                                        //lala++;
                                        try {
                                            /* buys.push(await client.order({
                  symbol: symbol,
                  side: 'BUY',
                  quantity: buyQty,
                  price: bp,
                })) */

                                            las[symbol] = la;
                                            hbs[symbol] = hb;
                                            notabuys.push(symbol)
                                            console.log(await client.order({
                                                symbol: symbol,
                                                side: 'SELL',
                                                quantity: sellQty,
                                                price: sp,
                                            }))
                                            console.log(buys);
                                            console.log(sells);
                                        } catch (err) {

                                            console.log(err);
                                        }
                                    }

                                }

                            }
                        }
                    }
                }
                /*

                 */
            }
        }
        //  }
        for (var g in gos) {
            for (var symbol in gos[g]) {
                console.log('1 ' + symbol)
                //testing
                if (true) { //if (symbol == "GNTBNB"){
                    let book = (await client.book({
                        symbol: symbol
                    }))
                    let hb = 0;
                    let laless = 0;
                    let hbless = 0;
                    let bsover = 0;
                    let asover = 0;
                    for (var bid in book.bids) {
                        if (parseFloat(book.bids[bid].price) > hb) {
                            hbless = hb
                            hb = parseFloat(book.bids[bid].price);
                        }
                        if (parseFloat(book.bids[bid].price) > borders[symbol]) {
                            bsover += parseFloat(book.bids[bid].quantity);
                        }
                    }
                    let la = 50000000000000000000000;
                    for (var ask in book.asks) {
                        if (parseFloat(book.asks[ask].price) < la) {
                            laless = la
                            la = parseFloat(book.asks[ask].price)
                        }
                        if (parseFloat(book.asks[ask].price) < aorders[symbol]) {
                            asover += parseFloat(book.asks[ask].quantity);
                        }
                    }

                    console.log(symbol + ' la: ' + la + ' hb: ' + hb)
                    console.log(aorders[symbol])
                    if (symbol != 'BNBUSDS' && ((hblesss[symbol] != hbless || lalesss[symbol] != laless) || ((las[symbol] != la && hbs[symbol] != hb) && (aorders[symbol] != la && borders[symbol] != hb)))) {
                        console.log(buyQtys[symbol] + ' ; ' + bsover);
                        if (buyQtys[symbol] * maxBetterVol < bsover || buyQtys[symbol] == undefined) {
                            hblesss[symbol] = hbless;
                            lalesss[symbol] = laless;
                            if (symbol.substring(symbol.length - 4, symbol.length) == g) {

                                asset = symbol.substring(0, symbol.length - 4)
                            } else {
                                asset = symbol.substring(0, symbol.length - 3)

                                //console.log('asset: ' + asset)
                            } //console.log('asset: ' + asset)
                            let orders = (await client.openOrders({
                                symbol: symbol,
                            }))

                            for (var o in orders) {
                                console.log(orders[o])
                                console.log('cancel')
                                console.log(await client.cancelOrder({
                                    symbol: symbol,
                                    orderId: orders[o].orderId,
                                }))

                            }
                            balances = (await client.accountInfo()).balances
                            for (var b in balances) {
                                bals[balances[b].asset] = parseFloat(balances[b].free)
                            }
                            if (lala == 0) {
                                //console.log(precisions[symbol]);
                                //console.log(filters[symbol])
                                //console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / Object.keys(gos[g]).length).toFixed(filters[symbol].stepSize - 1));
                                bp = (hb * 1.0001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                let stop = (bp * stoploss)
                                stop = stop.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .9999)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                                //buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / Object.keys(gos[g]).length).toFixed(filters[symbol].stepSize - 1));
                                //testing
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] * 0.99 / (hb * 1.0001) / Object.keys(gos[g]).length / 1.5).toFixed(filters[symbol].stepSize - 1));
                                console.log('buyQty: ' + buyQty)
                                let dontgo = false;
                                //console.log(buyQty)
                                //console.log(bp)
                                /*if (hb == bp){
                                    console.log('dontgo buy = ask');
                                    dontgo = true;
                                }*/
                                if (buyQty > maxOrder) {
                                    console.log('dontgo maxOrder ' + symbol)
                                    dontgo = true;
                                }
                                if ((buyQty * hb * 1.0001) < filters[symbol].minNotional) {
                                    console.log('dontgo minnotional ' + symbol)
                                    dontgo = true;
                                }
                                if (buyQty < filters[symbol].minQty) {

                                    console.log('dontgo minqty ' + symbol)
                                    dontgo = true;
                                }
                                 if (dontgo == false && buyQty > 0.00001 && ((neversellataloss == true && dontbuy[symbol] == false) || (dontbuy[symbol] == undefined))) {
                                    renew[symbol] = false;
                                    if (avgBids[symbol] > 0.00000000000000000001){
                                    buyOs[symbol] = avgBids[symbol] * 1.002;
                                }else {

                                    buyOs[symbol] = bp * 1.002;
                                }
                                divisor[symbol] = 1;

                                    stopp[symbol] = stop;
                                    buyOs[symbol] = bp;
                                    //lala++;
                                    try {
                                        buyQtys[symbol] = buyQty;
                                        aorders[symbol] = la;
                                        selling[symbol] = true;
                                        borders[symbol] = hb;
                                        console.log(await client.order({
                                            symbol: symbol,
                                            side: 'BUY',
                                            quantity: buyQty,
                                            price: bp,
                                        }))
                                        /*
                console.log(await client.order({
                  symbol: symbol,
                  side: 'SELL',
                  quantity: bals[asset],
                  price: sp,
                })) */
                                        console.log(buys);
                                        console.log(sells);
                                    } catch (err) {

                                        console.log(err);
                                    }
                                }
                            }


                            las[symbol] = la;
                            hbs[symbol] = hb;
                        }
                        /*

                         */
                    }
                }
            }
        }

        console.log(count * 1 + ' intervals')
       
        count++;
    } catch (err) {
       
        console.log(err);
    }
}
setInterval(function() {
    doit();
}, 60000)
let bals = {}

function countDecimalPlaces(number) {
    var str = "" + number;
    if (str == '1e-7') {
        str = "0.0000001"
    } else {

        if (str == '1e-8') {
            str = "0.00000001"
        }
        var index = str.indexOf('.');


    }
    if (index >= 0) {
        return str.length - index;
    } else {
        return 1;
    }
}

let buyOs = []

let divisor = {}
let stopp = {}
let buys = []
let sells = []
let las = {}
let hbs = {}
let aorders = {}
let borders = {}
let buyQtys = {}
let lalesss = {};
let hblesss = {};