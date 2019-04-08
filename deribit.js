module.exports = {

};
var RestClient = require("deribit-api").RestClient;

var restClient = new RestClient("J1seZCRTZTnu", "QHH2P6LYQDWUBR7FBIOV3VXILUJ56C3H", "https://test.deribit.com");
//import Deribit from 'deribit-ws-js'
//let Deribit = require('deribit-ws-js').Deribit
//const ws = new Deribit({key: "HwjG9hsiYvLb", secret: "MZ4XSMDKR4HPOLRUCZ7LVQ7VA6QXM6VY", testnet: true})
const WebSocket = require('ws');
const ws = new WebSocket('wss://test.deribit.com/ws/api/v1/');
let result;
ws.on('message', function incoming(data) {
//    console.log('on message');

    if(data.length > 0)
    {
        var obj = JSON.parse(data);
//        console.log(obj);
result = obj.result;
//console.log(result)
if (obj.id == 5232) {
            //
        }
    }

});
ws.on('open', function open() {
    var obj = {
        
        "action": "/api/v1/public/getsummary",
        "arguments": {
            "instrument": "futures"
        }//,
       // sig: restClient.generateSignature("/api/v1/public/getsummary")
    };
/*    var args = {
        "instrument": ["BTC-PERPETUAL"],
        "event": ["order_book"]
    };
    var obj = {
        "id": 5232,
        "action": "/api/v1/private/subscribe",
        "arguments": args,
        sig: restClient.generateSignature("/api/v1/private/subscribe", args)
    };
*/
    console.log('Request object', obj);
setInterval(function(){
    ws.send(JSON.stringify(obj));
}, 30000);
});
let modular = require('./modular.js')
var ccxt = require("ccxt");
let deribit  = new ccxt.deribit ({ 'enableRateLimit': true, apiKey: "J1seZCRTZTnu", secret: "QHH2P6LYQDWUBR7FBIOV3VXILUJ56C3H" })
deribit.urls['api'] = deribit.urls['test'];
//var RestClient = require("deribit-api").RestClient;

//var restClient = new RestClient();


async function tickers(){
//await ws.connected
//ws.hook('order_book', 'futures', function(data){
//console.log(data)
//})
 // let markets = await deribit.fetchMarkets()
  let aa = 0;
if (true){
// for (var m in markets){
    aa++;
//    console.log(markets[m].symbol)
//setTimeout(function(){
    //restClient.getsummary(markets[m].symbol).then((result) => {

  //console.log(result)
  //let ticker = result
  let tickers = result
//console.log(tickers)
for (var t in tickers){
//  tickers[0] = ticker
    if (modular.asks[tickers[t].instrumentName] == undefined) {
            modular.asks[tickers[t].instrumentName] = {}
            modular.bids[tickers[t].instrumentName] = {}
        }
        let pair;
        if (tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 4, tickers[t].instrumentName.length).startsWith('USD')) {
            pair = tickers[t].instrumentName.substring(0, tickers[t].instrumentName.length - 4) + '/' + tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 4, tickers[t].instrumentName.length);
        } else {
            pair = tickers[t].instrumentName.substring(0, tickers[t].instrumentName.length - 3) + '/' + tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 3, tickers[t].instrumentName.length);

        }
        if (!modular.pairs.includes(pair)) {
            modular.pairs.push(pair);
        }
        modular.asks[tickers[t].instrumentName]['default'] = tickers[t].askPrice
        modular.bids[tickers[t].instrumentName]['default'] = tickers[t].bidPrice
        //console.log(modular.asks)
        if (tickers[t].instrumentName == 'ETH-PERPETUAL') {
            btcs['ETH'] = tickers[t].bidPrice;
        } else if (tickers[t].instrumentName == 'BNBBTC') {
            btcs['BNB'] = tickers[t].bidPrice;
        }
        let symbol = tickers[t].instrumentName;
        let asset;
        if (symbol.substring(symbol.length - 3, symbol.length) == 'BTC') {

            asset = symbol.substring(0, symbol.length - 3)


            if (asset != 'ETH' && asset != 'BTC' && asset != 'USD' && asset != 'BNB') {
                btcs[asset] = parseFloat(tickers[t].bidPrice)
            }

        }

        if (tickers[t].instrumentName == 'BTC-PERPETUAL') {

            for (b in btcs) {
                btcs2[b] = btcs[b]
            }
            btcs['BTC'] = parseFloat(tickers[t].bidPrice);
        }
        let spread = (100 * (1 - parseFloat(tickers[t].bidPrice) / parseFloat(tickers[t].askPrice)))
        spreads[tickers[t].instrumentName] = spread;
        modular.tickVols[tickers[t].instrumentName] = (parseFloat(tickers[t].volumeBtc))
        
        if (!modular.ticks.includes(tickers[t].instrumentName) && spread) {
            //spreads[tickers[0].instrumentName] = spread;
            //tickVols[tickers[0].instrumentName] = (parseFloat(tickers[0].volumeQuote))
            if (tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 4, tickers[t].instrumentName.length).includes('USD')) {
                if (!modular.bases.includes(tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 4, tickers[t].instrumentName.length))) {
                    modular.bases.push(tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 4, tickers[t].instrumentName.length))
                }
            } else {
                if (!modular.bases.includes(tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 3, tickers[t].instrumentName.length))) {
                    modular.bases.push(tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 3, tickers[t].instrumentName.length))
                }
            }
            modular.ticks.push(tickers[t].instrumentName)
            for (var t in tickers) {
                for (b in modular.bases) {
                    if (modular.vols[modular.bases[b]] == undefined) {
                        modular.vols[modular.bases[b]] = 0;
                        modular.cs[modular.bases[b]] = 0;
                    }
                    if (tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 4, tickers[t].instrumentName.length) == modular.bases[b]) {
                        modular.vols[modular.bases[b]] += (parseFloat(tickers[t].volumeBtc));
                        modular.cs[modular.bases[b]]++;
                    } else if (tickers[t].instrumentName.substring(tickers[t].instrumentName.length - 3, tickers[t].instrumentName.length) == modular.bases[b]) {
                        modular.vols[modular.bases[b]] += (parseFloat(tickers[t].volumeBtc));
                        modular.cs[modular.bases[b]]++;
                    }
                }

            }
}
        }
  //  }, 100 * markets.length)
    
//});
}
//console.log(modular.asks)
}
setInterval(async function(){
  tickers();
}, 20000)
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




module.exports.exchangeOpenOrders = async function exchangeOpenOrders(symbol){
if (symbol == undefined){
symbol ='BTC-27SEP19'
}
let since = deribit.milliseconds () - 86400000 / 24
let limit=5
let orders3 = []
console.log(symbol)
console.log(since)
console.log(limit)
if (true){
//for (var symbol in candles){
 let o = (await deribit.fetchOpenOrders(symbol, since, limit))
if (o.length == 0){
return([])
}
//console.log('o')
//console.log(o)for (v
for (var or in o){
o[or].side == o[or].direction
}
console.log(o)
return(o)
for (var or in o){
orders3.push(o[or])
//console.log(orders3)
//console.log(o[or])
}
}
console.log(orders3)
for (var or in orders3){

orders3[or].side = orders3[or].direction
}
console.log(orders3)
return(orders3)
  
}
module.exports.exchangeOpenOrdersBySymbol = async function exchangeOpenOrdersBySymbol(symbol){
  return await deribit.fetchOpenOrders(symbol, since, limit)

}
module.exports.exchangeCancelOrder = async function exchangeCancelOrder(order){
console.log('cancel123')
console.log(order.id)
console.log(await deribit.cancelOrder(order.id))

} /*
module.exports.exchangeCancelOrder = async function exchangeCancelOrder(symbol, orderId){
  
  await deribit.cancelOrder(orderId)

} */

module.exports.exchangeCandlesAndBooks = async function exchangeCandlesAndBooks(t){
      let since = deribit.milliseconds () - 86400000
    let limit = 24;
let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
        //await sleep (deribit.rateLimit) // milliseconds
        let candles2 =  (await deribit.fetchOHLCV (t, '1h', since, limit)) // one minute
//console.log(candles2)
        let candle = candles2[candles2.length-1]
       try{
//console.log(candle)
        candles[t] = candle[5]
}catch(err){
  
}
console.log(candles)
let ob =  await deribit.fetchOrderBook(t, 10);
thebooks[t] = {asks: ob.asks, bids: ob.bids}

}
module.exports.alt = "ETH";
setInterval(async function(){
  let balances = await deribit.fetchBalance();
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
  }, 30000);
module.exports.exchangeUpdateBalances = async function exchangeUpdateBalances(){
  setInterval(async function(){
  let balances = await deribit.fetchBalance();
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
  }, 30000);
}
let tradeids = []
let trades2 = []
let btcVol = 0;
//setTimeout(function(){
//exchangeDoTrades('btc');
//}, 5000);
module.exports.exchangeDoTrades = async function exchangeDoTrades(symbol){
 restClient.positions(function(trades){//deribit.private_get_position({'symbol':symbol})
trades = trades.result
//console.log(trades);

//            modular.ts[symbol] = (trades)

//console.log(trades)
            for (var t in trades) {
console.log(trades[t])
modular.ts[trades[t].instrument] = trades[t]
//console.log(trades[t])
                if (!tradeids.includes(trades[t].instrument + trades[t].direction) && parseFloat(trades[t].time) > starttime2) {

//                    tradeids.push(trades[t].id + trades[t].time + trades[t].orderId);
trades[t].qty = trades[t].amount;
trades[t].price = trades[t].settlementPrice;
trades[t].quoteQty = trades[t].sizeBtc
trades[t].time = new Date().getTime()
if (trades[t].direction == 'sell'){
trades[t].isBuyer = false;
}
else {
trades[t].isBuyer = true;

}
trades2.push({
                       // 'commission': trades[t].commission,
                        //'commissionAsset': trades[t].commissionAsset,
                        'quoteQty': trades[t].quoteQty,
                        'symbol': trades[t].instrument,
                        'qty': trades[t].qty,
                        'price': trades[t].price,
                        'isBuyer': trades[t].isBuyer,
                        'time': trades[t].time
                    })
//console.log(trades2)
			trades[t].symbol = trades[t].instrument
                    if (trades[t].instrument != 'ETHBTC' && trades[t].instrument != 'USDBTC' && trades[t].instrument != 'BTCUSD') {
                        if (trades[t].instrument.substring(trades[t].instrument.length - 4, trades[t].instrument.length).startsWith('USD') || trades[t].instrument.substring(trades[t].symbol.length - 3, trades[t].symbol.length).startsWith('USD')) {
                            btcVol+= parseFloat(trades[t].quoteQty) / btcs['BTC']
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'ETH') {
                            btcVol+= parseFloat(trades[t].quoteQty) * btcs['ETH']
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BTC') {

                            btcVol+= ((parseFloat(trades[t].quoteQty)))
                        } else if (trades[t].symbol.substring(trades[t].symbol.length - 3, trades[t].symbol.length) == 'BNB') {
                            btcVol+= (((parseFloat(trades[t].quoteQty) * btcs['BNB'])))
                        }
                        //console.log(btcVol)
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
})
}
let actualstarttime = new Date().getTime()
let starttime2 = new Date().getTime() - 24 * 60 * 60 * 1000;
let filters = {}
module.exports.exchangeInfo = async function exchangeInfo(){
  console.log('exinfo')
  let exchange = (await deribit.fetchMarkets())
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
  try {
  if (type.toLowerCase() == 'market'){
  if (side.toLowerCase()=='sell'){
    return await deribit.createMarketSellOrder(symbol, qty);

  }
  else if (side.toLowerCase()=='buy'){
return  await   deribit.createMarketBuyOrder(symbol, -qty);

  }
  }
  else {
  if (side.toLowerCase()=='sell'){
    console.log(symbol)
    console.log(qty)
    console.log(price)
setTimeout(async function(){
    let o = await  restClient.sell(symbol, Math.floor(qty), price);
    console.log(o)
    return(o)
}, Math.random() * 10 * 1000)
  }
  else if (side.toLowerCase()=='buy'){
setTimeout(async function(){
    return await restClient.buy(symbol, Math.floor(qty), price);
}, Math.random() * 10 * 1000);
  }
  }
  }catch(err){
    console.log(err)
  }
}
