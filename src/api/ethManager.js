import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

var Web3 = require('web3');
var web3 = new Web3();



//GETH COMMAND TO LAUNCH ETH SERVER: geth --rpc --rpcaddr "127.0.0.1" --rpcport "8545" \
// --rpc --rpccorsdomain "http://regis.nu" console
web3.setProvider(new web3.providers.HttpProvider("http://192.168.1.9:8545"));
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


        if(web3.isConnected())
        {
            console.log('web3 is connected');
            var password= "test";

            console.log(web3.eth.accounts);

            var account  = web3.eth.accounts.create(password);
            //web3.eth.accounts.create();
            //console.log(account);
        }
        else {
            res.json({ "ERROR": "web3 not connected" });
        }



        res.json({ "TODO": "CREATE WALLET AND RETURN PRIVATE KEY AND PUBLIC ADDRESS" });
    });

    api.get('/getBalance/:walletAddress', (req, res) => {
        res.json({ "TODO": "GET THE BALANCE" });
    });





    // in case of no route found
    api.get('/', (req, res) => {
        res.json({ "Error": "Route not configured" });
    });

    return api;
}