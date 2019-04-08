const HitBTC = require('hitbtc-api').default
var PortfolioAnalytics = require('portfolio-analytics');
var Coinigy = require('node-coinigy');
var coinigy = new Coinigy('d5f624d6e56f64dc9a937045608ab534', 'fd16191c79fd349c90cdf083b5c1f874');

let btctot = 0;
setInterval(function(){
  coinigy.balances()
.then(function (body) {
  btctot = 0;
  for(var b in body.data){
    btctot += parseFloat(body.data[b].btc_balance);
    
  }
})
}, 5000)
let starttime = new Date().getTime()
const express = require('express');
const app = express();
var request = require("request")
var bodyParser = require('body-parser')
let key = "d236e08c5eb56e8c33b6eb4708804aa8";
let secret = "e9bc8024b9fae13f25f2947c1cbcb0e2";

let targetSpread = 1.09;
let targetVolDiv = 3;
let targetVolMult = 350;
let maxOrder = 1800000;
let minOrder = 0;
let maxBetterVol = 1.5;
let neversellataloss = true;
let stoploss = 0.88;
let neversellatalossReductionIntervalMinutes = 30;

let msg = 'msg<br>';

let returnPortfolio;
let benchmark;
let zeroRisk;
let sharpe;
let buying = {}

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
const restClient = new HitBTC({ key, secret, isDemo: false });

let buyOs = {}
let sells = []
let las = {}
let hbs = {}
let aorders = {}
let borders = {}
let buyQtys = {}
let lalesss = {};
let hblesss = {};

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'ejs');
let buys = {}
app.listen(process.env.PORT || 80, function() {});

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
let btcstart = 0.0090257945916578;
let ethstart = 0.2661241859903951;
let usdstart = 35.479676476239476;

let changed = {}
let btcref = 3987;
let ethtotal = 0;
let btctotal = 0;
let trades2 = []
let totalbefore = 0;
let tradeids = []
let bals3 = {}
let bals4 = {}
let tradedBalsPlus = {}
let tradedBalsMinus = {}
let stopp = {}
let least = 99999999999999999999999999999999;
async function getTrades(){
    bals3 = {}
    bals4 = {}
    balances = (await restClient.getMyBalance()).balance
    for (var b in balances) {
        if (balances[b].cash > 0 || balances[b].reserved > 0){
        bals3[b] = parseFloat(balances[b].cash)
        bals4[b] = parseFloat(balances[b].reserved)
    }
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
    //    btcVol = 0;
        
        for (var g in gos){

            for (var symbol in gos[g]){
        let trades = (await restClient.getAllMyTrades({
          symbol: symbol,
        })).trades
        // least = 99999999999999999999999999999999;
        for (var t in trades){
if (!tradeids.includes(trades[t].clientOrderId + trades[t].timestamp.toString())){
    if (trades[t].timestamp > starttime){
        if (trades[t].side == 'buy'){
            tradedBalsPlus[trades[t].symbol] += parseFloat(trades[t].execQuantit)
        }
        else {
            changed[symbol] = true;
            tradedBalsMinus[trades[t].symbol] = parseFloat(trades[t].execQuantity)
        }
    }
// if (trades[t].timestamp < least){
 //               least = trades[t].timestamp;
  //          }

            if (trades[t].side == 'buy'){
                if (buyOs[symbol] == undefined || (changed[symbol] == true  || changed[symbol] == undefined)){
                                    changed[symbol] = false;
                                    if (usddiff > -99999999999.00000000000001){
                                        if (usddiff > 0){
                                    if (avgBids[symbol] > 0.00000000000000000001){
                                    buyOs[symbol] = avgBids[symbol]  * 1.002;
                                }else {
                                    avgBids[symbol] = bp;
                                    buyOs[symbol] = bp   * 1.002;
                                }
                                        }
                                        else {
                                   if (avgBids[symbol] > 0.00000000000000000001){
                                    buyOs[symbol] = avgBids[symbol]  * (1-(usddiff/100/(gocount / 4)));
                                }else {
                                    avgBids[symbol] = bp;
                                    buyOs[symbol] = bp   * (1-(usddiff/100/(gocount / 4)));
                                }
                            }
                        }
                                if (usddiff == undefined){
                                if (avgBids[symbol] > 0.00000000000000000001){
                                    buyOs[symbol] = avgBids[symbol]  * (1-(-0.0001/100/(gocount / 4)));
                                }else {
                                    avgBids[symbol] = bp;
                                    buyOs[symbol] = bp   * (1-(-0.0001/100/(gocount / 4)));
                                }
                                }
                            }
        //console.log(btcVol)
      //console.log(trades[t].symbol)
                      //console.log(trades[t])

            if (trades[t].symbol != 'ETHBTC' && trades[t].symbol != 'USDBTC' && trades[t].symbol != 'BTCUSD'){
            //if (trades[t].timestamp < least){
            //    least = trades[t].timestamp;
            //}
            if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'USD'){
                
            if (feesusd[trades[t].symbol] == undefined){
                feesusd[trades[t].symbol] = 0
            }

                btcVol += ((parseFloat(trades[t].fee) * btcs2['USD']) ) / .002
                feesusd[trades[t].symbol] += (parseFloat(trades[t].fee) * 2 )/ parseFloat(trades[t].execPrice)
            }
            else  if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'ETH'){
               

            if (feeseth[trades[t].symbol] == undefined){
                feeseth[trades[t].symbol] = 0
            }//console.log('eth:' + btcs2['ETH'])
                btcVol += (((parseFloat(trades[t].fee)) * btcs['ETH'])) / .002
                feeseth[trades[t].symbol] +=(parseFloat(trades[t].fee)* 2 ) / parseFloat(trades[t].execPrice)
            }
            else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BTC'){
             
            if (feesbtc[trades[t].symbol] == undefined){
                feesbtc[trades[t].symbol] = 0
            }
                btcVol += ((parseFloat(trades[t].execPrice) * parseFloat(trades[t].execQuantity) * 2))
                feesbtc[trades[t].symbol] += (parseFloat(trades[t].fee) * 2) / parseFloat(trades[t].execPrice)
            }
        console.log('btcvol: ' + btcVol)
      
        }
    }


           // if (!tradeids.includes(trades[t].clientOrderId + trades[t].timestamp.toString())){
                tradeids.push(trades[t].clientOrderId + trades[t].timestamp.toString());
            
            trades2.push({'symbol': symbol, 'price': trades[t].execPrice, 'isBuyer': trades[t].side, 'time': trades[t].timestamp})
        }
        }
    }
}
}
let btcVol = 0;
let numOrders = 0;
let feesusd = {}
let feeseth = {}
let feesbtc = {}
let usddiff2;
let usddiff;
setTimeout(function(){

getTrades();
}, 14000)
setInterval(function(){
    getTrades()
}, 60 * 1001)
let rdiff = 0;
let retdiff = 0;
let rdiffs = []
let retdiffs = []
async function doPost(req, res) {
    numOrders = 0;
    let orders2  = (await restClient.getMyActiveOrders()).orders
    numOrders = orders2.length
    let buyOrders = 0;
    let sellOrders = 0;
    for (var o in orders2){
        if (orders2[o].side == 'buy'){
            buyOrders++;
        }
        else {
            sellOrders++;
        }
    }
    
    total2 = 0;
    let bals2 = {}
    balances = (await restClient.getMyBalance()).balance

    for (var b in balances) {

        bals2[b] = parseFloat(balances[b].cash) + parseFloat(balances[b].reserved)
    }

    total2 = 0;
    ethtotal = 0;
    btctotal = 0;
    ////console.log(bals2)
    for (var bal in bals2){
                    // //console.log(parseFloat(bals2[bal]))
                    if (bals2[bal] > 0.00001){
                 if (bal == 'USD'){
                    total2 += parseFloat(bals2[bal])
                }
                else if (bal == 'BTC'){

                    total2 += parseFloat(bals2[bal]) * parseFloat(btcs[bal])
                }
                else if (bal == 'ETH'){
                    console.log('eth ' + parseFloat(bals2[bal]) * parseFloat(btcs2[bal]))
                    total2 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])

                } else {
                    total2 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])
                }
               }
    
    }
    total2 = btctot * (parseFloat(btcs['BTC']))
    console.log('total2 before: ' + total2)
    
        if (true){
            let refdiff = 100* (-1 * (1 - (btcs['BTC'] / btcref)));
    usddiff = 100* (-1 * (1 - (total2 / usdstart)));
    btctotal = (((total2 / btcs['BTC'])));
    ethtotal = (((total2 / btcs2['ETH'])));
    let btcdiff = 100* (-1 * (1 - (btctotal / btcstart)));
    let ethdiff = 100* (-1 * (1 - (ethtotal / ethstart)));
    rdiff = refdiff;
    let adiff = [usddiff, btcdiff, ethdiff]
    let lll = -9999999999999999999999999999
    for (var a in adiff){
        if (adiff[a] > lll){
            lll = adiff[a]
        }
    }
    retdiff = lll;
    totalbefore = total2;
    /*
    for (var t in feesusd){

        bals2[t.substring(0, t.length-3)] += feesusd[t]
    }
    for (var t in feesbtc){

        bals2[t.substring(0, t.length-3)] += feesbtc[t]
    }
    for (var t in feeseth){

        bals2[t.substring(0, t.length-3)] += feeseth[t]
    }*/
    let total22 = 0;
   let ethtotal2 = 0;
  let  btctotal2 = 0;
    ////console.log(bals2)
    for (var bal in bals2){
                    // //console.log(parseFloat(bals2[bal]))
                    if (bals2[bal] > 0.00001){
                 if (bal == 'USD'){
                    total22 += parseFloat(bals2[bal])
                }
                else if (bal == 'BTC'){

                    total22 += parseFloat(bals2[bal]) * parseFloat(btcs[bal])
                }
                else if (bal == 'ETH'){
                    total22 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])

                } else {
                    total22 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])
                }
               }
    
    }

    total22 = btctot * (parseFloat(btcs['BTC']))
    let refdiff2= 100* (-1 * (1 - (btcs['BTC'] / btcref)));
    btctotal2 = (((total22 / btcs['BTC'])));
    btctotal2 = btctotal2 + (btcVol * 0.001)
    total22 = btctotal2 * btcs['BTC']
    ethtotal2 = (((total22 / btcs2['ETH'])));
    usddiff2 = 100* (-1 * (1 - (total22 / usdstart)));
    let btcdiff2 = 100* (-1 * (1 - (btctotal2 / btcstart)));
    let ethdiff2 = 100* (-1 * (1 - (ethtotal2 / ethstart)));
    let rdiff2 = refdiff2;
    let adiff2 = [usddiff2, btcdiff2, ethdiff2]
    let lll2 = -9999999999999999999999999999
    for (var a in adiff2){
        if (adiff2[a] > lll2){
            lll2 = adiff2[a]
        }
    }
    rdiff = refdiff;
    retdiff = lll2;
    console.log('total2 after: ' + total22)
    if (req.query.name) {
        res.json({
            usddiff: usddiff,
            btcdiff: btcdiff,
            ethdiff: ethdiff,
            total: total2,
            btc: btctotal,
            eth: ethtotal,
            usddiff2: usddiff2,
            btcdiff2: btcdiff2,
            ethdiff2: ethdiff2,
            total2: total22,
            btc: btctotal,
            eth: ethtotal,
            btc2: btctotal2,
            eth2: ethtotal2,
            trades2: trades2,
            trades: trades2.length,
            orders: numOrders,
            buyOrders: buyOrders,
            sellOrders: sellOrders,
            balances: bals3,
            balances2 : bals4,
            bids: avgBids,
            stops: stopp,
            buyOs: buyOs,
            divisor: divisor,
            btcVol: btcVol,
            least: least,
            refdiff: refdiff,
            refdiff2: refdiff2,
            sharpe: sharpe,
            msg: msg
        });

    } else {
        res.render('index.ejs', {
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
let eths = {}
let btcs2 = {}
    
askOrders = {}
bidOrders = {}
let notabuys = []
let count = 1;
let lala = 0;
let selling = {}
let precisions = {}
let filters = {}
let renew = {}
async function cancelAll() {
   
    for (var h in hblesss){
        renew[h] = true;
    }
    try {
        console.log(
            await restClient.cancelAllOrders())
    } catch (err) {
        //console.log(err);
    }
}
let usds = {}
setTimeout(function(){
cancelAll();
orders();
}, 1000)
async function orders(){
    
    let symbol = "STEEMBTC"
       
    
}
setInterval(function() {
    cancelAll();
}, 60 * 1000 * 4 * 4)
setTimeout(async function(){
let getSymbols = await restClient.getSymbols();

   for (var symbol in getSymbols.symbols) {
            base = getSymbols.symbols[symbol].symbol.substring(getSymbols.symbols[symbol].symbol.length - 3, getSymbols.symbols[symbol].symbol.length)

            if (base == 'BTC'){
                filters[getSymbols.symbols[symbol].symbol] = {
                'stepSize': countDecimalPlaces(parseFloat(getSymbols.symbols[symbol].lot)),
                'tickSize': 10}
        
    } else if (base == 'ETH'){
 filters[getSymbols.symbols[symbol].symbol] = {
                'stepSize': countDecimalPlaces(parseFloat(getSymbols.symbols[symbol].lot)),
                'tickSize': 11}
    }
    else if (base == 'USD'){
         filters[getSymbols.symbols[symbol].symbol] = {
                'stepSize': countDecimalPlaces(parseFloat(getSymbols.symbols[symbol].lot)),
                'tickSize': 9}
    } else {
        filters[getSymbols.symbols[symbol].symbol] = {
                'stepSize': countDecimalPlaces(parseFloat(getSymbols.symbols[symbol].lot)),
                'tickSize': countDecimalPlaces(parseFloat(getSymbols.symbols[symbol].step))}
    }
    }}, 600)
    
        setInterval(async function(){

let tickers = await restClient.getAllTickers();
   for (var t in tickers) {
    if (t   == 'ROXETH'){
        //console.log('ROXETH WOO')
    }
       
let symbol = t;
        let asset;
        if (symbol.substring(symbol.length - 3, symbol.length) == 'BTC') {

            asset = symbol.substring(0, symbol.length - 3)

}
            else   if (symbol.substring(symbol.length - 3, symbol.length) == 'ETH') {
                        asset = symbol.substring(0, symbol.length - 3)

        }
        
        let spread = (100 * (1 - parseFloat(tickers[t].bid) / parseFloat(tickers[t].ask)))
        if (!ticks.includes(t) && spread) {
            spreads[t] = spread;
            tickVols[t] = (parseFloat(tickers[t].volume_quote))
            if (t.substring(t.length - 4, t.length).includes('USD')) {
                if (!bases.includes(t.substring(t.length - 4, t.length))) {
                    bases.push(t.substring(t.length - 4, t.length))
                }
            } else {
                if (!bases.includes(t.substring(t.length - 3, t.length))) {
                    bases.push(t.substring(t.length - 3, t.length))
                }
            }
        

    
            ticks.push(t)
            for (var t in tickers) {
                for (b in bases) {
                    if (vols[bases[b]] == undefined) {
                        vols[bases[b]] = 0;
                        cs[bases[b]] = 0;
                    }
                    if (t.substring(t.length - 4, t.length) == bases[b]) {
                        vols[bases[b]] += (parseFloat(tickers[t].volume_quote));
                        cs[bases[b]]++;
                    } else if (t.substring(t.length - 3, t.length) == bases[b]) {
                        vols[bases[b]] += (parseFloat(tickers[t].volume_quote));
                        cs[bases[b]]++;
                    }
                }

            }

        }
    }
    for (var t in tickers){

let symbol = t;
        let asset;
        if (symbol.substring(symbol.length - 3, symbol.length) == 'BTC') {

            asset = symbol.substring(0, symbol.length - 3)

        if (!bases.includes(asset)) {
            if (asset == 'ROX'){
            }
            btcs[asset] = parseFloat(tickers[t].bid)
        }
}
            else   if (symbol.substring(symbol.length - 3, symbol.length) == 'ETH') {
                        asset = symbol.substring(0, symbol.length - 3)
if (!bases.includes(asset)) {
            if (asset == 'ROX'){
            }
            eths[asset] = parseFloat(tickers[t].bid)
        }
        } else   if (symbol.substring(symbol.length - 3, symbol.length) == 'USD') {
                        asset = symbol.substring(0, symbol.length - 3)
if (!bases.includes(asset)) {
            if (asset == 'ROX'){
            }
            usds[asset] = parseFloat(tickers[t].bid)
        }
        }
         for (var b in bases) {
            if (t == bases[b] + 'BTC') {
                btcs[bases[b]] = tickers[t].bid;
            }
            if (t == 'BTCUSD'){
                btcs2['USDBTC'] = tickers[t].bid
                btcs2['USD'] = 1 / btcs['BTC']
            }
        }
        if (t == 'ETHUSD'){
            for (b in eths) {
                if (b == 'ROX'){
                }
                btcs2[b] = eths[b] * tickers[t].bid
            }
            btcs2['ETH'] = tickers[t].bid
        }
        if (t == 'ETHBTC'){
eths['ETH'] = tickers[t].bid
}

        if (t == 'BTCUSD') {
            for (b in btcs) {
                if (b.startsWith('USD')){
                }

                btcs2[b] = btcs[b] * tickers[t].bid;
            

            }
                        btcs['BTC'] = parseFloat(tickers[t].bid);
        }
    }


        }, 5000)
        let dontbuy = {}
        let assetsbought = []
async function doit() {
    notabuys = []
    try {

       
        let balances = (await restClient.getMyBalance()).balance
        for (var b in balances) {
            bals[b] = parseFloat(balances[b].cash)
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

                    asset = t.substring(0, t.length - 3)
                        if (asset != 'USD' && asset != 'BTC' && asset != 'USDU'&& asset != 'ETH'){

                            gos[a][(t)] = tickVols[t];
                        }
                    }
                    } else if (t.substring(t.length - 4, t.length) == a) {
                        if (tickVols[t] > avgs[a] / targetVolDiv && tickVols[t] < avgs[a] * targetVolMult && spreads[t] > targetSpread) {
                            if (gos[a] == undefined) {
                                gos[a] = {}
                            }
                            asset = t.substring(0, t.length - 3)
                        if (asset != 'USD' && asset != 'BTC' && asset != 'USDU'&& asset != 'ETH'){

                            gos[a][(t)] = tickVols[t];
                        }
                    
                        }
                    }

                }
            }
        }
        //console.log(gos);
        let dont = []
        for (var sym in ticks) {

            for (var g in gos) {
                for (var symbol in gos[g]) {
                    asset = symbol.substring(0, symbol.length - 3)
                    if (asset != 'USD' && asset != 'BTC' && asset != 'USDU'){
                    if (symbol == sym) {
                        dont.push(asset)
                    }
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
                  
                        balances = (await restClient.getMyBalance()).balance
                        for (var b in balances) {
                            bals[b] = parseFloat(balances[b].cash) + parseFloat(balances[b].reserved)
                            }
                            asset = symbol.substring(0, symbol.length - 3)

                        //console.log('asset: ' + asset)

                        if (true) {
                            if (lala == 0) {
                                ////console.log(precisions[symbol]);
                                ////console.log(filters[symbol])
                                ////console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001)).toFixed(filters[symbol].stepSize - 1));
                                bp = (hb * 1.001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .999)
                                    //console.log('sp: ' + sp)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                                    //console.log('sp: ' + sp)
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / (Object.keys(gos[g]).length / 4)).toFixed(filters[symbol].stepSize - 1));
                                let dontgo = false;
                                let sellQty = (parseFloat(bals[asset]) * 1).toFixed(filters[symbol].stepSize - 1)
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
                                      let orders = (await restClient.getMyActiveOrders()).orders
                        for (var o in orders){
                            if (orders[o].symbol == symbol && orders[o].side == 'sell'){
                                 console.log(await restClient.cancelOrder({
                                    clientOrderId: orders[o].clientOrderId,
                                }))
                            }
                        }
                                                                    stopp[symbol] = 0;
                                buying[symbol] = false;

                                    //lala++;
                                    try {
                                        /* buys.push(await client.order({
                  symbol: symbol,
                  side: 'buy',
                  quantity: buyQty,
                  price: bp,
                })) */
                //console.log('sellQty: ' + sellQty)
                msg += symbol + ' market sell! @ ' + new Date().toString() + ' qty: ' + sellQty + '<br>';
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                            type: 'market'
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
        let gocount = 0;
        for (var g in gos) {
            for (var symbol in gos[g]) {
                gocount++;
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
                    //console.log(symbol + ' la: ' + la + ' hb: ' + hb)
                    if (symbol != 'BNBUSDS' && (hblesss[symbol] != hbless || lalesss[symbol] != laless) || (las[symbol] != la && hbs[symbol] != hb)) {
                        hblesss[symbol] = hbless
                        lalesss[symbol] = laless
                       let orders = (await restClient.getMyActiveOrders()).orders
                        for (var o in orders){
                            if (orders[o].symbol == symbol && orders[o].side == 'sell'){
                                 console.log(await restClient.cancelOrder({
                                    clientOrderId: orders[o].clientOrderId,
                                }))
                            }
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
                                bp = (hb * 1.001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .999)
                                    //console.log('sp: ' + sp)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                                    //console.log('sp: ' + sp)
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / (Object.keys(gos[g]).length / 4)).toFixed(filters[symbol].stepSize - 1));
                                let dontgo = false;
                                let sellQty = (parseFloat(bals[asset]) * 1).toFixed(filters[symbol].stepSize - 1)
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
                                ////console.log(bp)
                                
                                if (dontgo == false && sellQty > 0.00000001 && (neversellataloss == true && ((sp > buyOs[symbol]) || buyOs[symbol] == undefined))) {
                                    buying[symbol] = false;
                                    stopp[symbol] = 0;
                                    //lala++;
                                    try {
                                        /* buys.push(await client.order({
                  symbol: symbol,
                  side: 'buy',
                  quantity: buyQty,
                  price: bp,
                })) */
                //console.log('sellQty: ' + sellQty)
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                        if (order.ExecutionReport.orderStatus == 'rejected'){
                                            sellQty = sellQty / 10;
                                      
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                         if (order.ExecutionReport.orderStatus == 'rejected'){
                                            sellQty = sellQty / 10;
                                      
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))

                                         if (order.ExecutionReport.orderStatus == 'rejected'){
                                            sellQty = sellQty / 10;
                                      
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                          }
                                          }
                                          }
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
        //console.log('wololo')
        balances = (await restClient.getMyBalance()).balance
        for (var b in balances) {
            bals[b] = parseFloat(balances[b].cash)
        }

        for (var bal in bals) {
            let book;
            if (bal != 'BTC' && bal != 'USD' && bal != 'ETH' && bal != 'BNB' && bals[bal] != 0) {
                if (!bases.includes(bal)) {
                    let temp = (Math.random() <= 0.5) ? 1 : 2;
                    let symbol;
                    if (temp == 1){
                    let symbol = bal + 'ETH';
                } else {
                    let symbol = bal + 'ETH';

                }
                    //console.log(symbol)
                    if (true) {
                        //console.log(bal)
                        try {
                            book = (await restClient.getOrderBook(symbol))
                        } catch (err) {
                            if (temp == 1){
                                symbol = bal + 'ETH';
                            } else {
                                symbol = bal + 'USD';
                            }
                            //console.log(symbol)
                            try {
                                book = (await restClient.getOrderBook(symbol))
                            } catch (err) {
                                symbol = bal + 'BTC';
                                //console.log(symbol)
                                book = (await restClient.getOrderBook(symbol))
                            }
                        }
                    }
                    console.log(dont);
                    if (!dont.includes(bal)) {
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
                            let orders = (await restClient.getMyActiveOrders()).orders
                        for (var o in orders){
                            if (orders[o].symbol == symbol && orders[o].side == 'sell'){
                                 console.log(await restClient.cancelOrder({
                                    clientOrderId: orders[o].clientOrderId,
                                }))
                            }
                        }
}
                            
                            balances = (await restClient.getMyBalance()).balance
                            for (var b in balances) {
                                bals[b] = parseFloat(balances[b].cash)
                            }
                            
                                asset = symbol.substring(0, symbol.length - 3)


                            //console.log('asset: ' + asset)

                            if (bals[asset] != 0) {
                                if (lala == 0) {
                                    ////console.log(precisions[symbol]);
                                    ////console.log(filters[symbol])
                                    ////console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001)).toFixed(filters[symbol].stepSize - 1));
                                    bp = (hb * 1.001)
                                    bp = bp.toFixed(filters[symbol].tickSize - 1)
                                    sp = (la * .999)
                                    //console.log('sp: ' + sp)
                                    sp = sp.toFixed(filters[symbol].tickSize - 1)
                                    //console.log('sp: ' + sp)
                                    buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / (Object.keys(gos[g]).length / 4)).toFixed(filters[symbol].stepSize - 1));
                                    let dontgo = false;
                                    let sellQty = (parseFloat(bals[asset]) * 1).toFixed(filters[symbol].stepSize - 1)
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
                                    ////console.log(buyQty)
                                    ////console.log(bp)

                                    if (dontgo == false && sellQty > 0.00001 && (neversellataloss == true && ((sp > buyOs[symbol]) || buyOs[symbol] == undefined))) {
                                        buying[symbol] = false;
                                        stopp[symbol] = 0;
                                        //lala++;
                                        try {
                                            /* buys.push(await client.order({
                  symbol: symbol,
                  side: 'buy',
                  quantity: buyQty,
                  price: bp,
                })) */

                                            las[symbol] = la;
                                            hbs[symbol] = hb;
 //                                           notabuys.push(symbol)
                                            sellQty = sellQty * 1000
                                            //console.log('sellQty: ' + sellQty)
                                            order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                        if (order.ExecutionReport.orderStatus == 'rejected'){
                                            sellQty = sellQty / 10;
                                      
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                         if (order.ExecutionReport.orderStatus == 'rejected'){
                                            sellQty = sellQty / 10;
                                      
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                           if (order.ExecutionReport.orderStatus == 'rejected'){
                                            sellQty = sellQty / 10;
                                      
                                        order = (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        }))
                                          }
                                          }

                                          }
                                            console.log({
                                            symbol: symbol,
                                            side: 'sell',
                                            quantity: Number(sellQty),
                                                price: Number(sp)
                                        })
                                            //console.log(buys);
                                            //console.log(sells);
                                        } catch (err) {

                                            //console.log(err);
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
                //console.log('1 ' + symbol)
                //testing
                if (true) { //if (symbol == "GNTBNB"){
                    let book = (await restClient.getOrderBook(symbol))
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

                    //console.log(symbol + ' la: ' + la + ' hb: ' + hb)
                    //console.log(aorders[symbol])
                    //console.log('renew: ' + renew[symbol])
                    if (renew[symbol] == undefined || renew[symbol] == true || (symbol != 'BNBUSDS' && !notabuys.includes(symbol) && ((hblesss[symbol] != hbless || lalesss[symbol] != laless) || ((las[symbol] != la && hbs[symbol] != hb) && (aorders[symbol] != la && borders[symbol] != hb))))) {
                        
                        //console.log(buyQtys[symbol] + ' ; ' + bsover);
                        if (buyQtys[symbol] * maxBetterVol < bsover || buyQtys[symbol] == undefined || Number.isNaN(bsover) ) {
                            hblesss[symbol] = hbless;
                            lalesss[symbol] = laless;
                           
                                asset = symbol.substring(0, symbol.length - 3)
                                assetsbought.push(asset);
                            //console.log('asset: ' + asset)
                           let orders = (await restClient.getMyActiveOrders()).orders
                        for (var o in orders){
                            if (orders[o].symbol == symbol && orders[o].side == 'buy'){
                                 console.log(await restClient.cancelOrder({
                                    clientOrderId: orders[o].clientOrderId,
                                }))
                            }
                        }

}
if (true){
                        
                            balances = (await restClient.getMyBalance()).balance
                            for (var b in balances) {
                                bals[b] = parseFloat(balances[b].cash) + parseFloat(balances[b].reserved)
                            }
                            //console.log('1')
                            if (true) {
                            //console.log('2')
                                ////console.log(precisions[symbol]);
                                ////console.log(filters[symbol])
                                ////console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / gocount).toFixed(filters[symbol].stepSize - 1));
                                bp = (hb * 1.001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                let stop = (bp * stoploss)
                                stop = stop.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .999)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                            //console.log('3')
                                //buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / gocount).toFixed(filters[symbol].stepSize - 1));
                                //testing\
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] * 0.99 / (hb * 1.0001) / ((gocount / 4)  * (2))).toFixed(filters[symbol].stepSize - 1));
                            
                                //console.log('buyQty: ' + buyQty)
                                let dontgo = false;
                                ////console.log(buyQty)
                                ////console.log(bp)
                                /*if (hb == bp){
                                    //console.log('dontgo buy = ask');
                                    dontgo = true;
                                }*/
                                //console.log(filters[symbol]);
                                //console.log('bp: ' + bp)
                                if (buyQty > maxOrder || buyQty <= minOrder) {
                                    //console.log('dontgo maxOrder ' + symbol)
                                    dontgo = true;
                                }
                                if ((buyQty * hb * 1.0001) < filters[symbol].minNotional) {
                                    //console.log('dontgo minnotional ' + symbol)
                                    dontgo = true;
                                }
                                if (buyQty < filters[symbol].minQty) {

                                    //console.log('dontgo minqty ' + symbol)
                                    dontgo = true;
                                }
if (avgBids[symbol] > 0.00000000000000000001){
                                  //  buyOs[symbol] = avgBids[symbol] * 1.002;
                                }else {
                                    avgBids[symbol] = bp;
                                    //buyOs[symbol] = bp * 1.002;
                                }
                                if (dontgo == false && buyQty > 0.00001 && ((neversellataloss == true && true) || (true))) {
                                    renew[symbol] = false;
                                    
                                if (divisor[symbol] == undefined){
                                divisor[symbol] = 1;
                            }
                            buying[symbol] == true;
                            console.log('buyos')
                            console.log(buyOs)
                            console.log('usddiff')
                            console.log(usddiff)
                            console.log('avgbids')
                            console.log(avgBids[symbol])
                            console.log('bp')
                            console.log(bp)
                            console.log('gocount')
                            console.log(gocount / 4)

                                    stopp[symbol] = stop;
                                    //lala++;
                                    try {
                                        buyQtys[symbol] = buyQty;
                                        aorders[symbol] = la;
                                        selling[symbol] = true;
                                        borders[symbol] = hb;
                                        console.log(await restClient.placeOrder({
                                            symbol: symbol,
                                            side: 'buy',
                                            quantity: buyQty,
                                            price: bp,
                                        }))
                                        /*
                //console.log(await client.order({
                  symbol: symbol,
                  side: 'sell',
                  quantity: bals[asset],
                  price: sp,
                })) */
                                        //console.log(buys);
                                        //console.log(sells);
                                    } catch (err) {

                                        //console.log(err);
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
setTimeout(function(){
    doit();
}, 1000)
        //console.log(count * 1 + ' intervals')
        
    } catch (err) {
        
setTimeout(function(){
    doit();
}, 1000)
        //console.log(err);
    }
}
setTimeout(function(){
    doit();
}, 15000)
setInterval(function() {
    doit();
}, 60 * 1000 * 5 * 3)
let bals = {}
let divisor = {}
setInterval(function(){
for (var symbol in divisor){
    let factor;
    if (tradedBalsMinus[symbol] / tradedBalsPlus[symbol] < 1){
        factor = (1 + ( 0.0001 *  1 /(tradedBalsMinus[symbol] / tradedBalsPlus[symbol])))
    }
    else  if (tradedBalsMinus[symbol] / tradedBalsPlus[symbol] > 1){
        factor = (1 + (-0.0001 * (tradedBalsMinus[symbol] / tradedBalsPlus[symbol])))
    }
    else {
        factor = 1
    }
    divisor[symbol] = divisor[symbol] * factor
buyOs[symbol] = buyOs[symbol] / divisor[symbol]
}
}, 60 * neversellatalossReductionIntervalMinutes * 1000)
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
