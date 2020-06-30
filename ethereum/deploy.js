const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const deployer = require('./build/Deployer.json');

const provider = new HDWalletProvider(
    'shiver friend depart test hockey wire siege diagram outdoor term better property',
    'https://rinkeby.infura.io/v3/9722c86bcc7c4e8b8616de9049f1f1e7'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy contract from account", accounts[0]);

    const result = await new web3.eth.Contract(deployer.abi)
        .deploy({data: deployer.evm.bytecode.object})
        .send({from: accounts[0]});

    console.log("Contract deployed to ", result.options.address);
};

deploy();
