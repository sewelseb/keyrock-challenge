import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

var Web3 = require('web3');
var web3 = new Web3();


//TODO: set the port i get from geth
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config, db }));


    api.get('/createWallet', (req, res) => {

        //console.log(web3);


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