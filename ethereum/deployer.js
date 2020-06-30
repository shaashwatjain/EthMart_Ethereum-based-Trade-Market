import web3 from './web3';
import deployer from './build/Deployer.json';

const instance = new web3.eth.Contract(
    deployer.abi,
    '0xe4131D3709C4b11A2488f21755659205cfCC074a'
);

export default instance;