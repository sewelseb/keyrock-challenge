import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

var Web3 = require('web3');
var web3 = new Web3("http://127.0.0.1:8545");



//GETH COMMAND TO LAUNCH ETH SERVER: geth --rpc --rpcaddr "127.0.0.1" --rpcport "8545" \
// --rpc --rpccorsdomain "http://regis.nu" console
//web3.setProvider(new Web3.providers.HttpProvider("http://192.168.1.9:8545"));
//console.log('web3 is connected:'+web3.isConnected());
//web3.setProvider(new web3.providers.HttpProvider("http://localhost:30303"));
//web3.setProvider(new web3.providers.HttpProvider("http://52.169.42.101:30303"));

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config, db }));


    api.get('/createWallet', (req, res) => {

        /*if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }*/
        //console.log(web3._requestManager);


        //console.log('web3 is connected');
        //var password= "test";

        console.log(web3.eth.accounts);

        //var account  = web3.eth.accounts.create(password);
        var account  = web3.eth.accounts.create();
        //web3.eth.accounts.create();
        console.log(account);




        res.json(account);
    });

    api.get('/getBalance/:walletAddress', (req, res) => {
        //console.log(req.params.walletAddress);
        var balance = web3.eth.getBalance(req.params.walletAddress);
        res.json(balance);
    });

    api.post('/getBalance/transaction', (req, res) => {
        //console.log(req.params.walletAddress);
        var privateKey = req.body.privatekey;
        var destination  = req.body.destination;
        var amount = req.body.amount;
        var transaction = web3.eth.sendTransaction({
            from: privateKey,
            to: destination,
            value: amount
        });
        res.json(transaction);
    });



    // in case of no route found
    api.get('/', (req, res) => {

        res.json({ "Error": "Route not configured" });
    });

    return api;
}