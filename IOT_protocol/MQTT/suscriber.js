var fs = require('fs');
//var call =require('../../blockchain/Hyperledger/test2.js');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
var writableStream = fs.createWriteStream('./sensordata.yaml');

client.on('connect', function () {
  //suscrib presence topic
  client.subscribe('presence');
});

 client.on('message', function (topic, message) {
 writableStream.write(message.toString());
 console.log(message.toString());
 process.exit();
});

/*
	
// call.parse();
 var exec = require('child_process').exec;
var cmdStr="cd  /home/ubuntu/module/blockchain/Hyperledger;node test.js";

// var cmdStr="cd  ../../blockchain/Hyperledger;node 42-test.js";
 exec(cmdStr,function(err,stdout,stderr){
    if(err) {
        console.log('error');
    }
        else
	 {
         console.log("success");
        }
}

);
  client.end();
});
*/
