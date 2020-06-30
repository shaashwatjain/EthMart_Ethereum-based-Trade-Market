import web3 from './web3';
import Item from './build/Seller.json';

export default (address) => {
    return new web3.eth.Contract(
        Item.abi,
        address
    );
};