# binanceMarketMaker


If you prefer not to use the referral link, consider an Eth donation: 0x9f785ca281f00e2cf5ceec6bec02e0ef3f0eeedc a BTC donation: 358wCiMaP4jW3q2XBTA4MgXoX8uLY3zmAc a USDT donation: 35yrkFpGVZ46JjhUZ6iGxhtBgKg56ogjZo


Tl;dr come join us here! https://t.me/themarketmakerbot


https://github.com/DunnCreativeSS/binanceMarketMaker


https://imgur.com/B8sz2KN


This bot automates making markets on Binance.


Where other market making bots fail (ie. BitMex, Deribit, other attempts I've made in the past) is by counting on the market to not be volatile. Where this bot wins is by finding markets where we can soak up profits in the volatility by taking those profits from the spread itself, where on BitMex and Deribit these spreads ar 0.25$ of a BTC, some smaller markets on Binance have 1%.. 2%... 5% spreads, and greater-than-average volumes.


You'll want to have about $20 per market pair it's looking to trade, in the base asset (BTC, BNB, ETH, etc...). It will look to trade more markets if the targetSpread, targetVolDiv, targetVolMult are higher. The more total funds in a particular base asset there are, the higher value the orders will have. 


maxBetterVol is the multiplier of your order size that's permissible as a better amount of volume before re-entering the books, allowing people to use the bot simultaneously without constantly bettering each other's bids/asks. If you have 100 units at a price, then the order quantity * maxBetterVol can exist better than your price before it re-enters.


If for whatever reason a market pair leaves the universe scope of considered pairs, it will continue selling that asset with the same sell logic (on the quoteAsset+BNB market), while pausing buying it.


I don't have enough personal funds available to run the bot, but I can get a good amount of income if I share it and people use my ref link. targetOrderSizeMult exists so that people can compete using the same bot on the same markets without it just outbidding the other bot constantly, as you can set a % of your order size to ignore when there's a bid or ask better than yours. When the volume that beats your price is higher than the order size * this multiplier, it'll re-enter the market. maxOrder is the maximum # individual units to buy (to avoid sh#tcoins).


'At the current time Binance rate limits are: 1200 requests per minute. 10 orders per second. 100,000 orders per 24hrs.'


There are no limits for unfilled orders, and at most it'll make about 6x 20 or so pairs x 2 orders, 1 cancel and 1 re-post a minute, along with checking balance and getting order books so a total of about ~500 a minute - not close to 1200 :)


On that note I've only been trading one pair, averaging 42 orders an hour or ~1000 per day, again by about 20 pairs would be 20 000 orders per day - a bit shy of 100k.



To use:


1. (please do) sign up for Binance using my ref link: https://www.binance.com/?ref=27039658


2. Place your Binance API key and secret in binance.js 


3. Optionally change the targetSpread, targetVolDiv, targetVolMult, targetOrderSizeMult, maxOrder, maxBetterVol


4. Install NPM and Node


5. Clone this repo, cd into directory


6. Run npm i binance-api-node express request ejs body-parser


7. Run node binance.js