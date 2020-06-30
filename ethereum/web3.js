import Web3 from 'web3';

let web3;


if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined')
{
    ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
}
else
{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/9722c86bcc7c4e8b8616de9049f1f1e7'
    );
    web3 = new Web3(provider);
}

export default web3;