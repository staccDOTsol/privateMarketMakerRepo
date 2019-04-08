
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
let dbo
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

MongoClient.connect(url, options, function(err, db) {
  if (err) throw err;
  dbo = db.db("mydb");
  dbo.createCollection("customers4", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});


var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set('view engine', 'ejs');
app.listen(process.env.binPORT || 8083, function() {});
    let binApiKey = 'XGjzcjFqDgd06qg6fNpjAIUzzebrbURXup3Z7P1OCXBoq8SoFvnYV0pgCoN69gbG',
    binApiSecret = 'yZ1oFZFGkJjn3CPK9XsRkuJXQJzKohZPhhv6Jz5GmcsAN1cOVevEWeSLJPBNzlYM'
let ex;
let maxBuyBtc = "0.05"
let targetBid = "0.0000400000"
let percentToBuy = "1.001"
let theonebase =  ""
let theoneasset =  ""
let bpSetting = "1.0005",
    spSetting = "0.9995",
    hourlyMult = "64",
    minProfit = "1.0079",
    targetSpread = "0.7",
    targetVolDiv = "10",
    targetVolMult = "20000",
    maxOrder = "4000",
    maxBetterVol = "1.5",
    stoploss = "0.88",
    neversellatalossReductionIntervalMinutes = "10",
    btcstart = "0.0018875010993860003",
    usdstart = "8.92308594730334",
    altstart = "0.47517776028044917"
    var WooCommerceAPI = require('woocommerce-api');
 
var WooCommerce = new WooCommerceAPI({
  url: 'http://techvoices.club',
  consumerKey: 'ck_74cbe1acfe710e06a22c2f116dcf4c24a1d1f7f5',
  consumerSecret: 'cs_1f3789366846fb131b8ecaff7521fe2d04191be9',
  wpAPI: true,
  version: 'wc/v1'
});


  const {google} = require('googleapis');
var compute2 = google.compute('v1');

app.post('/delete', (request, res) => {
  	let name = request.body.name
  	let user_id = request.body.current_user_id
  	  dbo.collection("customers4").find({user_id: user_id}).toArray(function(err, result) {
let i = 0;
for (var name2 in result[0].names){
  if (result[0].names[name2] == name){
    result[0].names.splice(i, 1);
    result[0].ips.splice(i, 1);
  }
  i++;
}dbo.collection("customers4").updateMany({user_id: user_id}, {$set:{names:result[0].names,user_id: user_id, ips:result[0].ips,credits: result[0].credits}},{upsert: true}, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
})
})
  authorize(function(authClient) {
  var request = {
    project: 'rare-daylight-236219',
    zone: 'us-central1-c',
    // Name of the instance resource to delete.
    instance: name,  // TODO: Update placeholder value.

    auth: authClient,
  };
  compute2.instances.delete(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
    res.redirect('http://techvoices.club/manage-bots')
  });
});

function authorize(callback) {
  google.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
      console.error('authentication failed: ', err);
      return;
    }
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      authClient = authClient.createScoped(scopes);
    }
    callback(authClient);
  });
}


})
app.post('/orders', (request, res) => {
	current_user_id = request.body.current_user_id
console.log(current_user_id)

  WooCommerce.get('orders', function(err, data, result) {
  result= JSON.parse(result)
  
  for(var o in result){
    console.log(result[o].status)
    console.log(result[o].shipping_tax)
    console.log(result[o].id)
    if(result[o].customer_id == current_user_id && result[o].status == "processing"){
    let credits;
        dbo.collection("customers4").findOne({user_id: current_user_id}, function(err, result2) {
    if (err) {
      credits = 0;
      throw err;}
      if (result2 == undefined){
        credits = 0;
      }else {
    credits = (result2.credits);
      }
      if (result2){
     dbo.collection("customers4").update({user_id: current_user_id}, {names: result2.names, ips: result2.ips, user_id: current_user_id, credits: credits + 1},{upsert: true}, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
      
      
})
}
else {
      dbo.collection("customers4").update({user_id: current_user_id}, {names: [], ips: [], user_id: current_user_id, credits: 1},{upsert: true}, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
      
      
})
}
      var data = {
    status: 'completed'
  
};

WooCommerce.put('orders/' + result[o].id, data, function(err, data, res) {
  console.log(JSON.parse(res));
});
  });
   
    }
    
  }
       
  dbo.collection("customers4").find({user_id: current_user_id}).toArray(function(err, result) {
    if (err) throw err;
    console.log('result')
    console.log(result)
    if (result[0]){
    console.log(result[0].credits)
    res.json({'credits': result[0].credits, 'ips': result[0].ips, current_user_id: result[0].user_id});
}
  });
});

})
app.get('/', (req, res) => {
    //*
    try {
dbo.collection("customers4").findOne({user_id: req.query.current_user_id}, function(err, result2) {
if (result2){
    res.json({names: result2.names, credits: result2.credits, ips: result2.ips, current_user_id: result2.user_id})
}
    })
}

catch(err){}
})
app.post('/', (req, res) => {
  let request = req;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
ex = request.body.ex
if (request.body.maxBuyBtc != undefined){
 maxBuyBtc = request.body.maxBuyBtc
 targetBid = request.body.targetBid
 percentToBuy = request.body.percentToBuy
 theonebase =  request.body.theonebase
 theoneasset =  request.body.theoneasset
}
	binApiKey = request.body.binApiKey
    binApiSecret = request.body.binApiSecret
	bpSetting = request.body.bpSetting
    spSetting = request.body.spSetting
    hourlyMult = request.body.hourlyMult
    minProfit = request.body.minProfit
    targetSpread = request.body.targetSpread
    targetVolDiv = request.body.targetVolDiv
    targetVolMult = request.body.targetVolMult
    maxOrder = request.body.maxOrder
    maxBetterVol = request.body.maxBetterVol
    stoploss = request.body.stoploss
    neversellatalossReductionIntervalMinutes = request.body.neversellatalossReductionIntervalMinutes
    btcstart = request.body.btcstart
    usdstart = request.body.usdstart
    altstart = request.body.altstart
    dbo.collection("customers4").findOne({user_id: request.body.current_user_id}, function(err, result2) {
	if (result2){
	if (result2.credits >=0.001){
	createVMWithStartupScript('test' + Math.floor(Math.random() * 1000000), request.body.current_user_id)
	}
	}
    res.redirect('http://techvoices.club/manage-bots')

    })
})

const Compute = require('@google-cloud/compute');
const fetch = require('node-fetch');

const compute = new Compute();
const zone = compute.zone('us-central1-c');

/**
 * Create a new virtual machine with Ubuntu and Apache
 * @param {string} name Name of the virtual machine
 */
async function createVMWithStartupScript(name, userid) {
  // Create a new VM, using default ubuntu image. The startup script
  // installs apache and a custom homepage.
  const config = {
    os: 'ubuntu',
    http: true,
    metadata: {
      items: [
        {
          key: 'startup-script',
          value: `#! /bin/bash
            # Installs apache and a custom homepage
            apt-get update
            apt-get install -y git wget gzip build-essential ntpdate
            
            curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
            sudo bash nodesource_setup.sh
            sudo apt-get install nodejs -y
            git clone http://root:wordpass@marketmakerbot.duckdns.org/root/privatemarketmakerrepo
              
ab=$(dig @resolver1.opendns.com ANY myip.opendns.com +short)
            export theurl="http://$ab"
            export ex="`+ex+`"
            
 export maxBuyBtc="`+maxBuyBtc+`"
 export targetBid="`+targetBid+`"
 export percentToBuy="`+percentToBuy+`"
 export theonebase="`+theonebase+`"
export theoneasset="`+ theoneasset+`"
            export bpSetting="`+bpSetting+`"
		    export spSetting="`+spSetting+`"
		    export hourlyMult="`+hourlyMult+`"
		    export minProfit="`+minProfit+`"
		    export targetSpread="`+targetSpread+`"
		    export targetVolDiv="`+targetVolDiv+`"
		    export targetVolMult="`+targetVolMult+`"
		    export maxOrder="`+maxOrder+`"
		    export maxBetterVol="`+maxBetterVol+`"
		    export stoploss="`+stoploss+`"
        set rlim_fd_max = 166384
set rlim_fd_cur = 8192
ulimit -n 2048
		    export neversellatalossReductionIntervalMinutes="`+neversellatalossReductionIntervalMinutes+`"
		    export btcstart="`+btcstart+`"
		    export usdstart="`+usdstart+`"
		    export altstart="`+altstart+`"
		    cd privatemarketmakerrepo
		    npm i
        sudo ntpdate time.nist.gov
		    nohup node modular.js &`,
        },
      ],
    },
  };

  const vm = zone.vm(name);

  console.log(`Creating VM ${name}...`);
  const [, operation] = await vm.create(config);

  console.log(`Polling operation ${operation.id}...`);
  await operation.promise();

  console.log('Acquiring VM metadata...');
  const [metadata] = await vm.getMetadata();

  // External IP of the VM.
  const ip = metadata.networkInterfaces[0].accessConfigs[0].natIP;
 
 
  dbo.collection("customers4").find({user_id: userid}).toArray(function(err, result) {
    if (result[0].ips != undefined){
    i = result[0].ips
    }
    else {
      i = []
    }
    i.push(ip)
    if (result[0].names != undefined){
    n = result[0].names
    }
    else {
      n = []
    }
    if (!n.includes(name)){
    n.push(name)
    }
    if (!i.includes(ip)){
    i.push(ip)
    }
    
  dbo.collection("customers4").update({user_id: userid}, {names: n, user_id: userid, credits: result[0].credits,ips: i},{upsert: true}, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  })
  
  })
  console.log(`Booting new VM with IP http://${ip}...`);

  // Ping the VM to determine when the HTTP server is ready.
  console.log('Operation complete. Waiting for IP');
  await pingVM(ip);

  console.log(`\n${name} created succesfully`);
}

/**
 * Poll a given IP address until it returns a result.
 * @param {string} ip IP address to poll
 */
 setTimeout(function(){
countUpTime()
}, 2000)
  setInterval(function(){
countUpTime()
}, 60000)
async function countUpTime() {
    dbo.collection("customers4").find({}).toArray(async function(err, result) {
    if (err) throw err;
    for (var r in result){
      let credits = result[r].credits
      let ips = result[r].ips
  let user_id = result[r].user_id
  if (user_id != undefined){
  let exit = false;
    for (var ip in ips){
    doCheck(ips[ip], user_id)
      }
    }
  }
    
  });
}
async function doCheck(ip, user_id){
  console.log(ip)
  try {
        console.log(user_id)
  dbo.collection("customers4").find({user_id: user_id}).toArray(function(err, result) {
    let cs = result[0].credits - 0.00002314814
        dbo.collection("customers4").updateMany({user_id: user_id}, {$set:{names:result[0].names,user_id: user_id, ips:result[0].ips,credits: cs}},{upsert: true}, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
        })
  })
    } catch (err) {
      console.log(err)
    }
}
async function pingVM(ip) {
  let exit = false;
  while (!exit) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const res = await fetch(`http://${ip}`);
      if (res.status !== 200) {
        throw new Error(res.status);
      }
      exit = true;
    } catch (err) {
      process.stdout.write('.');
    }
  }
}

const args = process.argv.slice(2);
