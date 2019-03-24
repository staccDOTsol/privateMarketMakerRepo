const HitBTC = require('hitbtc-api').default
var PortfolioAnalytics = require('portfolio-analytics');


let key = "";
let secret = "";

let targetSpread = 0.75;
let targetVolDiv = 3;
let targetVolMult = 350;
let maxOrder = 1800000;
let minOrder = 0;
let maxBetterVol = 1.5;

let returnPortfolio;
let benchmark;
let zeroRisk;
let sharpe;
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

let buys = []
let sells = []
let las = {}
let hbs = {}
let aorders = {}
let borders = {}
let buyQtys = {}
let lalesss = {};
let hblesss = {};

const express = require('express');
const app = express();
var request = require("request")
var bodyParser = require('body-parser')

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 8079, function() {});

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
let btcstart = 0.01810541947013747;
let ethstart = 0.53102375662021;
let usdstart = 72.1863074274381;
let btcref = 3992;
let ethtotal = 0;
let btctotal = 0;
let trades2 = []
let totalbefore = 0;
let tradeids = []
let bals3 = {}
let bals4 = {}
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
// if (trades[t].timestamp < least){
 //               least = trades[t].timestamp;
  //          }

            if (trades[t].side == 'buy'){
        //console.log(btcVol)
      //console.log(trades[t].symbol)
                      //console.log(trades[t])

            if (trades[t].symbol != 'ETHBTC' && trades[t].symbol != 'USDBTC' && trades[t].symbol != 'BTCUSD'){
            //if (trades[t].timestamp < least){
            //    least = trades[t].timestamp;
            //}
            if (fees[trades[t].symbol] == undefined){
                fees[trades[t].symbol] = 0
            }
            if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'USD'){
                
                btcVol += ((parseFloat(trades[t].fee) * btcs2['USD']) ) / .002
                fees[trades[t].symbol] += (parseFloat(trades[t].fee) * btcs2['USD'])
            }
            else  if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'ETH'){
                //console.log('eth:' + btcs2['ETH'])
                btcVol += (((parseFloat(trades[t].fee)) * btcs['ETH'])) / .002
                fees[trades[t].symbol] +=parseFloat(trades[t].fee) * btcs['ETH']
            }
            else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BTC'){
                btcVol += ((parseFloat(trades[t].execPrice) * parseFloat(trades[t].execQuantity) * 2))
                fees[trades[t].symbol] += parseFloat(trades[t].fee) * 2
            }

        //console.log(btcVol)
      
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
let fees = {}
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
    for (var t in fees){
        bals2[t.substring(0, t.length-3)] += fees[t]
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
                    total2 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])

                } else {
                    total2 += parseFloat(bals2[bal]) * parseFloat(btcs2[bal])
                }
               }
    
    }
        if (true){
            let refdiff = 100* (-1 * (1 - (btcs['BTC'] / btcref)));
    let usddiff = 100* (-1 * (1 - (total2 / usdstart)));
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
    if (req.query.name) {
        res.json({
            usddiff: usddiff,
            btcdiff: btcdiff,
            ethdiff: ethdiff,
            total: total2,
            btc: btctotal,
            eth: ethtotal,
            trades2: trades2,
            trades: trades2.length,
            orders: numOrders,
            buyOrders: buyOrders,
            sellOrders: sellOrders,
            balances: bals3,
            balances2 : bals4, 
            btcVol: btcVol, 
            least: least,
            refdiff: refdiff,
            sharpe: sharpe
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
        //console.log(await restClient.cancelAllOrders())
    } catch (err) {
        //console.log(err);
    }
}
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
                        dont.push(symbol)
                    }
}
                }
            }
        }

        for (var g in gos) {
            for (var symbol in gos[g]) {
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
                                if (dontgo == false && sellQty > 0.00000001) {

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
                    //console.log(dont);
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
                                    if (dontgo == false && sellQty > 0.00001) {

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
                                ////console.log((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / Object.keys(gos[g]).length).toFixed(filters[symbol].stepSize - 1));
                                bp = (hb * 1.001)
                                bp = bp.toFixed(filters[symbol].tickSize - 1)
                                sp = (la * .999)
                                sp = sp.toFixed(filters[symbol].tickSize - 1)
                            //console.log('3')
                                //buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] / (hb * 1.0001) / Object.keys(gos[g]).length).toFixed(filters[symbol].stepSize - 1));
                                //testing
                                buyQty = ((bals[symbol.substring(symbol.length - 3, symbol.length)] * 0.99 / (hb * 1.0001) / (Object.keys(gos[g]).length / 2)).toFixed(filters[symbol].stepSize - 1));
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
                                if (dontgo == false && buyQty > 0.00001) {
                                    renew[symbol] = false;
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
