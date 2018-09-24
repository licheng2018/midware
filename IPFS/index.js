const ipfsFile = require('./ipfsFile');
const fs = require('fs');
const crypto = require('crypto');
const AES = require('./aes');
const session_key=fs.createWriteStream('./key.yaml');
const hashcode=fs.createWriteStream('./hash.yaml');

let addPath = "../IOT_protocol/MQTT/file2.yaml";
let password = crypto.randomBytes(32).toString("hex");
let buff = AES.encrypt(fs.readFileSync(addPath),password);
//buff=fs.readFileSync(addPath);

session_key.write(password);
console.log("The password is:"+password);
ipfsFile.add(buff).then((hash)=>{
    console.log("The hash is:"+hash);
    console.log("https://ipfs.io/ipfs/"+hash);
    //return ipfsFile.get(hash);
    hashcode.write(hash);
// console.log(AES.decrypt(buff,newkey).toString('utf-8'));
}).catch((err)=>{
    console.log(err);
}
)

