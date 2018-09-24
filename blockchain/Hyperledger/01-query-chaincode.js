/*
 * quiry.js
 * Copyright (C) 2018 Licheng Zheng<lichengz@usc.edu or musicsir@outlook.com>
 *
 * Distributed under terms of the GPL license.
 */

var fs = require('fs');
var Fabric_Client = require('fabric-client');
var util = require('util'); 
var YAML = require('yamljs');
var data = YAML.parse(fs.readFileSync('../../configuration/HyperledgerFabric.yaml').toString());//used for reading configuration fill
var CHANNEL_NAME=data.CHANNEL_NAME;//read the configuration information from configuration file.
var USER_NAME=data.USER_NAME;
var MSPID=data.MSPID;
var PRIVATE_KEY=data.PRIVATE_KEY;
var SIGN_CERT=data.SIGN_CERT;
var PEER_ADDRESS=data.PEER_ADDRESS;
var PEER_ADDRESS_GRPC=data.PEER_ADDRESS_GRPC;
var PEER_SSL_TARGET=data.PEER_SSL_TARGET;
var ORDERER_SSL_TARGET=data.ORDERER_SSL_TARGET;
var ORDERER_ADDRESS=data.ORDERER_ADDRESS;
var CHAINCODE_ID=data.CHAINCODE_ID;
var CHANNEL_ID=data.CHANNEL_ID;
var LISTENING_ADDRESS=data.LISTENING_ADDRESS;
var timestamp='key1';

//创建一个Client
Fabric_Client.newDefaultKeyValueStore({ path: '/tmp/xx/' }).then((state_store) => {
    client=new Fabric_Client();
    client.setStateStore(state_store)

    //设置用户信息    
    var userOpt = {
        username: USER_NAME,
        mspid: MSPID,
        cryptoContent: { 
            privateKey: PRIVATE_KEY,
            signedCert: SIGN_CERT
        }
    }

    return client.createUser(userOpt)

}).then((user)=>{

    //设置要连接的Channel
    var channel = client.newChannel(CHANNEL_NAME);

    //设置要连接的Peer
    var peer = client.newPeer(
        PEER_ADDRESS_GRPC,
        {
            pem: fs.readFileSync('./certs/peer/tls/ca.crt', { encoding: 'utf8' }),
            clientKey: fs.readFileSync('./certs/peer/tls/client.key', { encoding: 'utf8' }),
            clientCert: fs.readFileSync('./certs/peer/tls/client.crt', { encoding: 'utf8' }),
            'ssl-target-name-override': PEER_ADDRESS
        }
    );

    channel.addPeer(peer);

    //调用chaincode
    const request = {
        chaincodeId: CHAINCODE_ID,   //chaincode名称
        fcn: 'query',          //调用的函数名
        args: [timestamp]         //参数
    };

    // send the query proposal to the peer
    return channel.queryByChaincode(request);

}).then((response)=>{
    console.log('Response is', response.toString());
})

