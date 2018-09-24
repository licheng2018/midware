const ipfsFile = require('./ipfsFile');
const fs = require('fs');
const crypto = require('crypto');
const AES = require('./aes');
var buff;
var outcome;

let key=fs.readFileSync('../PARSE/key.yaml');
let hashcode=fs.readFileSync('../PARSE/uploaddata.yaml').toString('utf-8');
console.log("The key is"+key);
console.log("The hash is"+hashcode);
ipfsFile.get(hashcode).then((buff)=>{
   // let obj = JSON.parse(buff.toString('utf-8'));
    //  console.log(buff);
	//console.log(buff);
	console.log(AES.decrypt(buff,key).toString('utf-8'));
	//console.log(buff.toString('utf-8'));
	//console.log(AES.decrypt(buff,key).toString('utf-8'));

}).catch((err)=>{
    console.log(err);
}
)

