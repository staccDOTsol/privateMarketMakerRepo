# HitBTCMarketMaker


If you prefer not to use the referral link, consider an Eth donation: 0x9f785ca281f00e2cf5ceec6bec02e0ef3f0eeedc a BTC donation: 358wCiMaP4jW3q2XBTA4MgXoX8uLY3zmAc a USDT donation: 35yrkFpGVZ46JjhUZ6iGxhtBgKg56ogjZo


Tl;dr come join us here! https://t.me/themarketmakerbot


HitBTC enjoys a fee rebate after so many trades, and Market Maker contracts you can take part in: https://hitbtc.com/mm


The code has not yet been developed to support HitBTC market making according to the above schedule - note that there's a requirement to have a certain % of the books for a certain amount of time in order to qualify for each progressive tier, while the bot trades a fraction of your base asset balance on each pair it identifies with a spread - to effectively be a market maker according to the tiers above, you need to hold a % of the books.


https://github.com/DunnCreativeSS/hitBTCMarketMaker


https://imgur.com/B8sz2KN


This bot automates making markets on hitBTC.


Where other market making bots fail (ie. BitMex, Deribit, other attempts I've made in the past) is by counting on the market to not be volatile. Where this bot wins is by finding markets where we can soak up profits in the volatility by taking those profits from the spread itself, where on BitMex and Deribit these spreads ar 0.25$ of a BTC, some smaller markets on HitBTC have 1%.. 2%... 5% spreads, and greater-than-average volumes.


You'll want to have about $20 per market pair it's looking to trade, in the base asset (BTC, BNB, ETH, etc...). It will look to trade more markets if the targetSpread, targetVolDiv, targetVolMult are higher. The more total funds in a particular base asset there are, the higher value the orders will have. 


maxBetterVol is the multiplier of your order size that's permissible as a better amount of volume before re-entering the books, allowing people to use the bot simultaneously without constantly bettering each other's bids/asks. If you have 100 units at a price, then the order quantity * maxBetterVol can exist better than your price before it re-enters.


If for whatever reason a market pair leaves the universe scope of considered pairs, it will continue selling that asset with the same sell logic (on the quoteAsset+BNB market), while pausing buying it.


I don't have enough personal funds available to run the bot, but I can get a good amount of income if I share it and people use my ref link. targetOrderSizeMult exists so that people can compete using the same bot on the same markets without it just outbidding the other bot constantly, as you can set a % of your order size to ignore when there's a bid or ask better than yours. When the volume that beats your price is higher than the order size * this multiplier, it'll re-enter the market. maxOrder is the maximum # individual units to buy (to avoid sh#tcoins).


To use:


1. (please do) sign up for HitBTC using my ref link: (link to come, consider a donation, above)


2. Place your HitBTC API key and secret in hitbtc.js 


3. Optionally change the targetSpread, targetVolDiv, targetVolMult, targetOrderSizeMult, maxOrder, maxBetterVol, minOrder


4. Install NPM and Node


5. Clone this repo, cd into directory


6. Run npm i hitbtc-api express request ejs body-parser portfolio-analytics
 

7. Run node hitbtc.js