//header files
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const { parse, stringify } = require('node:querystring');
var fs = require('fs');
const url = require('url');
const DataFrame = require('dataframe-js');
app.set('view engine', 'ejs');
const { FivePaisaClient } = require("5paisajs");
//******************************** */
//uses
app.use("/",express.static(__dirname + "/views"))
//mongo = require('./router/mongo')
//app.use('/mongo' , mongo);
var tokens = [];
// Configuration for your app
//*****************************************************************//
//fivepaisa api config
const conf = {
    appSource: "17234",
    appName: "5P50027160",
    userId: "r3TE4vpIQsD",
    password: "IpMv1BXmiBn",
    userKey: "Pm1ySKhwOCwRSz70mnu7xFlYV14vgEB4",
    encryptionKey: "YVFG7ZTRd4jY8GwtOR0WEjtfMcLb7XDb"

  };
  var client = new FivePaisaClient(conf);
//*****************************************************************//
//generate token
function generatetoken() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 20) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
//*****************************************************************//
//main request
  app.get("" , (req,res)=>{
    res.render('login', {name:'prajwal'});
})
//*********************************** */
//chart
app.get("/chart" , (req,res)=>{
  res.render('chart')
})
//*****************************************************************//
//login request
  app.post("/login" , (req,res)=>{
    var pin = req.body.pin;
    var totp = req.body.totp;
    console.log(pin);
    console.log(totp);
    console.log("got request");
// This client object can be used to login multiple users.
client.get_TOTP_Session("50027160", totp , pin).then(response => {
    // Fetch holdings, positions or place orders here.
    // Some things to try out are given below.
    console.log(response);
    console.log("logged in");
    t = generatetoken();
    tokens.push(t);
    var re = {
      auth : 'success',
      token : t
    }
    res.send(re)
    res.end
   })
  
  })
  

  app.get("/new", (req,res)=>{
    res.render('session');
   
  })
  app.post("/data" , (req,res)=>{
    console.log("got response here")
   console.log(req.body);
    client.historicalData('n', req.body.type, req.body.script, req.body.time,req.body.from, req.body.to).then((response) => {
     
      console.log("got response here")
        console.log(response);
        res.send(response)
    }).catch(err =>{
      res.send('error')
    })
  })
  app.get("/session" , (req,res)=>{
    var qd = url.parse(req.url, true).query;
    console.log(qd);
    if (tokens.includes(qd.token)) {
      res.render('session', {token:qd.token});
    } else {
      res.sendFile(__dirname + "/views/error.html")
    }
  })



server = app.listen(3100 , '0.0.0.0' , ()=>{
    console.log("app listening on port 3100");
})
