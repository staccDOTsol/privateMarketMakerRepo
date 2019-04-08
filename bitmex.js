module.exports = {

};

let modular = require('./modular.js')
var ccxt = require("ccxt");
let bitmex  = new ccxt.bitmex ({ 'enableRateLimit': true, apiKey: "nLKSvTRMKXry5iMELR07Y52q", secret: "TQkDKG3ynhmfgnE__xHjyDCgC3-zZ9e-1i4SIbI1OPN-4bRT" })
bitmex.urls['api'] = bitmex.urls['test'];


setInterval(async function(){
  let tickers = await bitmex.fetchTickers()
  for (var t in tickers) {
    if (modular.asks[tickers[t].symbol] == undefined) {
            modular.asks[tickers[t].symbol] = {}
            modular.bids[tickers[t].symbol] = {}
        }
        let pair;
        if (tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length).startsWith('USD')) {
            pair = tickers[t].symbol.substring(0, tickers[t].symbol.length - 4) + '/' + tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length);
        } else {
            pair = tickers[t].symbol.substring(0, tickers[t].symbol.length - 3) + '/' + tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length);

        }
        if (!modular.pairs.includes(pair)) {
            modular.pairs.push(pair);
        }
        modular.asks[tickers[t].symbol]['default'] = tickers[t].ask
        modular.bids[tickers[t].symbol]['default'] = tickers[t].bid
        
        if (tickers[t].symbol == 'ETH/USD') {
            btcs['ETH'] = tickers[t].bid;
        } else if (tickers[t].symbol == 'BNBBTC') {
            btcs['BNB'] = tickers[t].bid;
        }
        let symbol = tickers[t].symbol;
        let asset;
        if (symbol.substring(symbol.length - 3, symbol.length) == 'BTC') {

            asset = symbol.substring(0, symbol.length - 3)


            if (asset != 'ETH' && asset != 'BTC' && asset != 'USD' && asset != 'BNB') {
                btcs[asset] = parseFloat(tickers[t].bid)
            }

        }

        if (tickers[t].symbol == 'BTC/USD') {

            for (b in btcs) {
                btcs2[b] = btcs[b]
            }
            btcs['BTC'] = parseFloat(tickers[t].bid);
        }
        let spread = (100 * (1 - parseFloat(tickers[t].bid) / parseFloat(tickers[t].ask)))
        spreads[tickers[t].symbol] = spread;
        modular.tickVols[tickers[t].symbol] = (parseFloat(tickers[t].quoteVolume))
        
        if (!modular.ticks.includes(tickers[t].symbol) && spread) {
            //spreads[tickers[t].symbol] = spread;
            //tickVols[tickers[t].symbol] = (parseFloat(tickers[t].volumeQuote))
            if (tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length).includes('USD')) {
                if (!modular.bases.includes(tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length))) {
                    modular.bases.push(tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length))
                }
            } else {
                if (!modular.bases.includes(tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length))) {
                    modular.bases.push(tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length))
                }
            }
            modular.ticks.push(tickers[t].symbol)
            for (var t in tickers) {
                for (b in modular.bases) {
                    if (modular.vols[modular.bases[b]] == undefined) {
                        modular.vols[modular.bases[b]] = 0;
                        modular.cs[modular.bases[b]] = 0;
                    }
                    if (tickers[t].symbol.substring(tickers[t].symbol.length - 4, tickers[t].symbol.length) == modular.bases[b]) {
                        modular.vols[modular.bases[b]] += (parseFloat(tickers[t].quoteVolume));
                        modular.cs[modular.bases[b]]++;
                    } else if (tickers[t].symbol.substring(tickers[t].symbol.length - 3, tickers[t].symbol.length) == modular.bases[b]) {
                        modular.vols[modular.bases[b]] += (parseFloat(tickers[t].quoteVolume));
                        modular.cs[modular.bases[b]]++;
                    }
                }

            }

        }
    }
        
    
}, 5000)
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
  
  
}
module.exports.exchangeOpenOrdersBySymbol = async function exchangeOpenOrdersBySymbol(symbol){
  return await bitmex.fetchOpenOrders(symbol, since, limit)

}
module.exports.exchangeCancelOrder = async function exchangeCancelOrder(order){
  await bitmex.cancelOrder(order.info.orderID)

}
module.exports.exchangeCancelOrder = async function exchangeCancelOrder(symbol, orderId){
  
  await bitmex.cancelOrder(orderId)

}

module.exports.exchangeCandlesAndBooks = async function exchangeCandlesAndBooks(t){
      let since = bitmex.milliseconds () - 86400000
    let limit = 24;
let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
        //await sleep (bitmex.rateLimit) // milliseconds
        let candles2 =  (await bitmex.fetchOHLCV (t, '1h', since, limit)) // one minute
        let candle = candles2[candles2.length-2]
       
        candles[t] = candle[5]

let ob =  await bitmex.fetchOrderBook(t, 10);
thebooks[t] = {asks: ob.asks, bids: ob.bids}

}
module.exports.alt = "ETH";
setInterval(async function(){
  let balances = await bitmex.fetchBalance();
  bals = {}
    let coins = ['ETH', 'BTC']
  for (var b in coins){
    if (balances[coins[b]] != undefined){
      if (parseFloat(balances[coins[b]].free) > 0 || parseFloat(balances[coins[b]].total) > 0) {
          modular.bals3[coins[b]] = parseFloat(balances[coins[b]].free)
          modular.bals4[coins[b]] = parseFloat(balances[coins[b]].total) - parseFloat(balances[coins[b]].free)
          modular.balscombined[coins[b]] = parseFloat(balances[coins[b]].total)
          bals[coins[b]] = parseFloat(balances[coins[b]].total)
      }
    }
  }
  }, 10000);
module.exports.exchangeUpdateBalances = async function exchangeUpdateBalances(){
  setInterval(async function(){
  let balances = await bitmex.fetchBalance();
  bals = {}
    let coins = ['ETH', 'BTC']
  for (var b in coins){
    if (balances[coins[b]] != undefined){
      if (parseFloat(balances[coins[b]].free) > 0 || parseFloat(balances[coins[b]].total) > 0) {
          modular.bals3[coins[b]] = parseFloat(balances[coins[b]].free)
          modular.bals4[coins[b]] = parseFloat(balances[coins[b]].total) - parseFloat(balances[coins[b]].free)
          modular.balscombined[coins[b]] = parseFloat(balances[coins[b]].total)
          bals[coins[b]] = parseFloat(balances[coins[b]].total)
      }
    }
  }
  }, 10000);
}
let tradeids = []
let trades2 = []
let btcVol = 0;
module.exports.exchangeDoTrades = async function exchangeDoTrades(symbol){
 let trades = await bitmex.private_get_position({'symbol':symbol})

            modular.ts[symbol] = (trades)

            for (var t in trades) {
console.log(trades[t])
                if (!tradeids.includes(trades[t].id + trades[t].time + trades[t].orderId) && parseFloat(trades[t].time) > starttime2) {

                    tradeids.push(trades[t].id + trades[t].time + trades[t].orderId);
                    trades2.push({
                        'commission': trades[t].commission,
                        'commissionAsset': trades[t].commissionAsset,
                        'quoteQty': trades[t].quoteQty,
                        'symbol': trades[t].symbol,
                        'qty': trades[t].qty,
                        'price': trades[t].price,
                        'isBuyer': trades[t].isBuyer,
                        'time': trades[t].time
                    })

                    if (trades[t].symbol != 'ETHBTC' && trades[t].symbol != 'USDBTC' && trades[t].symbol != 'BTCUSD') {
                        if (trades[t].symbol.substring(trades[t].symbol.length - 4, trades[t].symbol.length).startsWith('USD') || trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length).startsWith('USD')) {
                            btcVol+= parseFloat(trades[t].quoteQty) / btcs['BTC']
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'ETH') {
                            btcVol+= parseFloat(trades[t].quoteQty) * btcs['ETH']
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BTC') {

                            btcVol+= ((parseFloat(trades[t].quoteQty)))
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BNB') {
                            btcVol+= (((parseFloat(trades[t].quoteQty) * btcs['BNB'])))
                        }
                        console.log(btcVol)
                    }
                    if (trades[t].time > actualstarttime) {
                   //     //console.log(trades[t])
                        if (trades[t].isBuyer) {
                            let symbol = trades[t].symbol
                            if (!Number.isNaN(parseFloat(trades[t].qty))){
                            if (buyOs[symbol] == undefined) {
                                buyOs[symbol] = []
                            }
                            modular.dontgo2[trades[t].symbol] = true
                            modular.settimeoutdontgo(trades[t].symbol)
                            if (usddiff != usddiff2) {

                                if (modular.avgBids[symbol] > 0.00000000000000000001) {
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].price) * (minProfit),
                                        qty: parseFloat(trades[t].qty)
                                    });
                                } else {
                                    modular.avgBids[symbol] = parseFloat(bp);
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].price) * (minProfit),
                                        qty: parseFloat(trades[t].qty)
                                    })
                                }
                            } else {
                                if (modular.avgBids[symbol] > 0.00000000000000000001) {
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].price) * (minProfit),
                                        qty: parseFloat(trades[t].qty)
                                    })
                                } else {
                                    modular.avgBids[symbol] = parseFloat(bp);
                                    buyOs[symbol].push({
                                        price: parseFloat(trades[t].price) * (minProfit),
                                        qty: parseFloat(trades[t].qty)
                                    })
                                }
                            }
                            //dontbuy[trades[t].symbol] = true
                            //console.log(symbol)
                            //console.log(buyOs[symbol])
                        }
                        } else {
                            for (var buyo in buyOs[trades[t].symbol]) {
                                if (buyOs[trades[t].symbol][buyo].price < parseFloat(trades[t].price)) {
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
module.exports.exchangeInfo = async function exchangeInfo(){
  console.log('exinfo')
  let exchange = (await bitmex.fetchMarkets())
    for (var ex in exchange) {
        let symbol = exchange[ex].symbol
        filters[symbol] = {
            'minPrice': parseFloat(0),
            'minQty': parseFloat(1),
            'tickSize': modular.countDecimalPlaces(parseFloat(exchange[ex].info.tickSize)),
            'stepSize': modular.countDecimalPlaces(parseFloat(exchange[ex].info.lotSize)),
            'minNotional': parseFloat(0.000001)
        }
    }
}

module.exports.exchangeOrder = async function exchangeOrder(symbol, side, qty, price, type){
  let o = await bitmex.createOrder (symbol, type.toLowerCase(), side.toLowerCase(), qty, price)
  console.log(o)
  return(o)
}