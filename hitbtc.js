module.exports = {

};
var request = require("request")
let modular = require('./modular.js')
const HitBTC = require('hitbtc-api').default

let key = process.env.binApiKey ||"215a4db1e0a945f1accbd14b269c681c";
let secret = process.env.binApiSecret || "a3e329898ce1baa5b4a71caabc9d9359";
const restClient = new HitBTC({ key, secret, isDemo: false });

setInterval(function(){
  tickers()
}, 60000);
setTimeout(function(){
  tickers()
}, 1000);
setTimeout(function(){
  tickers()
}, 5000);

async function tickers(){
  
let tickers = await restClient.getAllTickers();

    for (var t in tickers) {
       if (t == 'ETHBTC') {
         console.log('etheth')
            btcs['ETH'] = tickers[t].bid;
        } else if (t == 'BNBBTC') {
            btcs['BNB'] = tickers[t].bid;
        }
        let symbol = t;
        let asset;
        if (symbol.substring(symbol.length - 3, symbol.length) == 'BTC') {

            asset = symbol.substring(0, symbol.length - 3)


            if (asset != 'ETH' && asset != 'BTC' && asset != 'USD' && asset != 'BNB') {
                btcs[asset] = parseFloat(tickers[t].bid)
            }

        }

        if (t == 'BTCUSD') {
          console.log('\n\nbtcusd22\n\n')
            for (b in btcs) {
                btcs2[b] = btcs[b]
            }
            btcs['BTC'] = parseFloat(tickers[t].bid);
        }
        let spread = (100 * (1 - parseFloat(tickers[t].bid) / parseFloat(tickers[t].ask)))
        spreads[t] = spread;
        modular.tickVols[t] = (parseFloat(tickers[t].volume_quote))
        if (modular.asks[t] == undefined) {
            modular.asks[t] = {}
            modular.bids[t] = {}
        }
        let pair;
        if (t.substring(t.length - 4, t.length).startsWith('USD')) {
            pair = t.substring(0, t.length - 4) + '/' + t.substring(t.length - 4, t.length);
        } else {
            pair = t.substring(0, t.length - 3) + '/' + t.substring(t.length - 3, t.length);

        }
        if (!modular.pairs.includes(pair)) {
            modular.pairs.push(pair);
        }
        modular.asks[t]['default'] = tickers[t].ask
        modular.bids[t]['default'] = tickers[t].bid
        
        if (!modular.ticks.includes(t) && spread) {
            //spreads[t] = spread;
            //tickVols[t] = (parseFloat(tickers[t].volume_quote))
            if (t.substring(t.length - 4, t.length).includes('USD')) {
                if (!modular.bases.includes(t.substring(t.length - 4, t.length))) {
                    modular.bases.push(t.substring(t.length - 4, t.length))
                }
            } else {
                if (!modular.bases.includes(t.substring(t.length - 3, t.length))) {
                    modular.bases.push(t.substring(t.length - 3, t.length))
                }
            }
            modular.ticks.push(t)
            for (var t in tickers) {
                for (b in modular.bases) {
                    if (modular.vols[modular.bases[b]] == undefined) {
                        modular.vols[modular.bases[b]] = 0;
                        modular.cs[modular.bases[b]] = 0;
                    }
                    if (t.substring(t.length - 4, t.length) == modular.bases[b]) {
                        modular.vols[modular.bases[b]] += (parseFloat(tickers[t].volume_quote));
                        modular.cs[modular.bases[b]]++;
                    } else if (t.substring(t.length - 3, t.length) == modular.bases[b]) {
                        modular.vols[modular.bases[b]] += (parseFloat(tickers[t].volume_quote));
                        modular.cs[modular.bases[b]]++;
                    }
                }

            }

        }
        
    }
}
let thebooks = {}
let candles = {}
const express = require('express');
const app = express();
app.get('/trades2', (req, res) => {
    res.json(trades2)
});
app.get('/filters', (req, res) => {
    res.json(filters)
});
app.get('/btcVol', (req, res) => {
    res.json({'btcVol':btcVol})
});
app.get('/bals', (req, res) => {
    res.json(bals)
});
app.get('/btcs', (req, res) => {
    res.json(btcs)
});
app.get('/btcs2', (req, res) => {
    res.json(btcs2)
});
app.get('/buyOs', (req, res) => {
    res.json(buyOs)
});
let buyOs = {}
let btcs2 = {}
let btcs = {}
let bals = {}
app.get('/spreads', (req, res) => {
    res.json(spreads)
});
app.get('/candles', (req, res) => {
    res.json(candles)
});
app.get('/thebooks', (req, res) => {
    res.json(thebooks)
});
app.listen(process.env.binPORT || 8082, function() {});

let candies = []

       

let spreads = {}



module.exports.exchangeOpenOrders = async function exchangeOpenOrders(){
 console.log('openorders')
  let orders = (await restClient.getMyActiveOrders()).orders
  return orders
  
}
module.exports.exchangeOpenOrdersBySymbol = async function exchangeOpenOrdersBySymbol(symbol){
 console.log('ordersbysymbol')
  let orders = (await restClient.getMyActiveOrders({symbol: symbol})).orders
  return orders
}

module.exports.exchangeCancelOrder = async function exchangeCancelOrder(order){
console.log  (await restClient.cancelOrder({
      clientOrderId: order.clientOrderId,
  }))
}
let x = 1;
async function doCandlesAndBooks(t, x){
    try {
  request.get("https://api.hitbtc.com/api/2/public/candles/" + t + "?period=H1", function (e, r, data){
    data = JSON.parse(data)
  candles[t] = data[data.length-1].volumeQuote
   
  }) } catch (err){
      
    }
  try {
    let book = (await restClient.getOrderBook(t))
    let asks = []
    let bids = []
    for (var ask in book.asks){
        asks.push({quantity: book.asks[ask].volume, price: book.asks[ask].price})
    }
    for (var bid in book.bids){
        bids.push({quantity: book.bids[bid].volume, price: book.bids[bid].price})
    }
    thebooks[t] = {asks: asks, bids: bids}
  }
  
  catch(err){
    
  }
    setTimeout(function(){
      doCandlesAndBooks(t, x)
    }, 50 * x)
  
}
module.exports.exchangeCandlesAndBooks = async function exchangeCandlesAndBooks(t){
  setTimeout(function(){
    doCandlesAndBooks(t, x);
  }, 50 * x);
  x++;
  
}
module.exports.alt = "ETH";
module.exports.exchangeUpdateBalances = async function exchangeUpdateBalances(){
 console.log('balances')
  
  let balances = (await restClient.getMyBalance()).balance
  bals = {}
  for (var b in balances) {
      if (parseFloat(balances[b].cash) > 0 || parseFloat(balances[b].reserved) > 0) {
          modular.bals3[b] = parseFloat(balances[b].cash)
          modular.bals4[b] = parseFloat(balances[b].reserved)
          modular.balscombined[b] = parseFloat(balances[b].cash) + parseFloat(balances[b].reserved)
          bals[b] = parseFloat(balances[b].cash) + parseFloat(balances[b].reserved)
      }
  }
  console.log(bals)
}
let tradeids = []
let trades2 = []
let btcVol = 0;
module.exports.exchangeDoTrades = async function exchangeDoTrades(symbol){
 console.log('trades')
  let trades = (await restClient.getAllMyTrades({
          symbol: symbol,
        })).trades
        modular.ts[symbol] = (trades)
        // least = 99999999999999999999999999999999;
        for (var t in trades){
if (!tradeids.includes(trades[t].clientOrderId + trades[t].timestamp.toString()) && parseFloat(trades[t].timestamp) > starttime2) {

                    tradeids.push(trades[t].clientOrderId + trades[t].timestamp.toString());
                    trades2.push({
                        'commission': trades[t].fee,
                        'symbol': trades[t].symbol,
                        'qty': trades[t].execQuantity,
                        'price': trades[t].execPrice,
                        'isBuyer': trades[t].side,
                        'time': trades[t].timestamp
                    })
                    console.log({
                        'commission': trades[t].fee,
                        'symbol': trades[t].symbol,
                        'qty': trades[t].execQuantity,
                        'price': trades[t].execPrice,
                        'isBuyer': trades[t].side,
                        'time': trades[t].timestamp
                    })
                    if (trades[t].symbol != 'ETHBTC' && trades[t].symbol != 'USDBTC' && trades[t].symbol != 'BTCUSD') {
                        if (trades[t].symbol.substring(trades[t].symbol.length - 4, trades[t].symbol.length).startsWith('USD') || trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length).startsWith('USD')) {
                            btcVol+= (parseFloat(trades[t].execQuanity) * parseFloat(trades[t].execPrice)) / btcs['BTC']
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'ETH') {
                            btcVol+= (parseFloat(trades[t].execQuanity) * parseFloat(trades[t].execPrice)) * btcs['ETH']
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BTC') {

                            btcVol+= (((parseFloat(trades[t].execQuanity) * parseFloat(trades[t].execPrice))))
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BNB') {
                            btcVol+= ((((parseFloat(trades[t].execQuanity) * parseFloat(trades[t].execPrice)) * btcs['BNB'])))
                        }
                        console.log(btcVol)
                    }
                    if (trades[t].timestamp > actualstarttime) {
                   //     //console.log(trades[t])
                        if (trades[t].side == 'buy') {
                            let symbol = trades[t].symbol
                            if (!Number.isNaN(parseFloat(trades[t].execQuantity))){
                            if (buyOs[symbol] == undefined) {
                                buyOs[symbol] = []
                            }
                            modular.dontgo2[trades[t].symbol] = true
                            modular.settimeoutdontgo(trades[t].symbol)
                            if (usddiff != usddiff2) {

                                if (modular.avgBids[symbol] > 0.00000000000000000001) {
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].execPrice) * (minProfit),
                                        qty: parseFloat(trades[t].execQuantity)
                                    });
                                } else {
                                    modular.avgBids[symbol] = parseFloat(bp);
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].execPrice) * (minProfit),
                                        qty: parseFloat(trades[t].execQuantity)
                                    })
                                }
                            } else {
                                if (modular.avgBids[symbol] > 0.00000000000000000001) {
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].execPrice) * (minProfit),
                                        qty: parseFloat(trades[t].execQuantity)
                                    })
                                } else {
                                    modular.avgBids[symbol] = parseFloat(bp);
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].execPrice) * (minProfit),
                                        qty: parseFloat(trades[t].execQuantity)
                                    })
                                }
                            }
                            //dontbuy[trades[t].symbol] = true
                            //console.log(symbol)
                            //console.log(buyOs[symbol])
                        }
                        } else {
                            for (var buyo in buyOs[trades[t].symbol]) {
                                if (buyOs[trades[t].symbol][buyo].price < parseFloat(trades[t].execPrice)) {
                                    //console.log(trades[t].symbol + ' buyos slice: ')
                                    //console.log( buyOs[trades[t].symbol][buyo])
                                    buyOs[trades[t].symbol].splice(buyo, 1);

                                }
                            }
                        }
                    }
                   
                }
            }
}
let actualstarttime = new Date().getTime()
let starttime2 = new Date().getTime() - 24 * 60 * 60 * 1000;
let filters = {}
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
module.exports.exchangeInfo = async function exchangeInfo(){
 console.log('exchangeinfo')
  let getSymbols = await restClient.getSymbols();

   for (var symbol in getSymbols.symbols) {
            let base = getSymbols.symbols[symbol].symbol.substring(getSymbols.symbols[symbol].symbol.length - 3, getSymbols.symbols[symbol].symbol.length)

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
        filters[getSymbols.symbols[symbol].symbol]['minPrice'] = 0
        filters[getSymbols.symbols[symbol].symbol]['minQty'] = 0
        filters[getSymbols.symbols[symbol].symbol]['minNotional'] = 0
        
        }
}

module.exports.exchangeOrder = async function exchangeOrder(symbol, side, qty, price, type){
 console.log('order')
return (await restClient.placeOrder({
                                            symbol: symbol,
                                            side: side.toLowerCase(),
                                            quantity: Number(qty),
                                            type: type.toLowerCase(),
                                            price: price
                                        }))
}