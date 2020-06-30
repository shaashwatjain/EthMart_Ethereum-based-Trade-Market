const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider({gasLimit: 10000000}));

const deployer = require('../ethereum/build/Deployer.json');
const seller = require('../ethereum/build/Seller.json');

let accounts;
let deployed;
let itemAddress;
let item;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    deployed = await new web3.eth.Contract(deployer.abi)
        .deploy({data: deployer.evm.bytecode.object})
        .send({from: accounts[0], gas: '10000000'});

    await deployed.methods.deployItem("Apple","Fresh",'100','2').send({
        from: accounts[1],
        gas: '1000000'
    });


    [itemAddress] = await deployed.methods.getDeployedItems().call();

    item = await new web3.eth.Contract(seller.abi, itemAddress);
});

describe('Testing', () => {
    it('Checks deployment', () => {
        assert(deployed.options.address);
        assert(item.options.address);
    });


    it('Lets purchase something and approve it and updates quantity', async () => {
        await item.methods.orderItem('1').send({
            from:accounts[2],
            value: '100',
            gas:'1000000'
        });

        await item.methods.approveOrder('0').send({
            from:accounts[1],
            gas:'1000000'
        });

        // const arrLength = await item.methods.numberOfOrders().call();
        // console.log(arrLength);

        const quantity = await item.methods.quantity().call();
        assert.ok(quantity,1);
    });

    it('updates quantity of item', async () => {
        await item.methods.editQty('2').send({
            from:accounts[1],
            gas:'1000000'
        });

        const quantity = await item.methods.quantity().call();
        assert.ok(quantity,2);
    });

    it('checks if different amount can be given',async () => {
        try {
            await item.methods.orderItem('1').send({
                from:accounts[2],
                value: '900',
                gas:'1000000'
            });
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });

    it('can mark the order complete and funds transfer',async () => {
        await item.methods.orderItem('1').send({
            from:accounts[3],
            value: '100',
            gas:'1000000'
        });

        await item.methods.approveOrder('0').send({
            from:accounts[1],
            gas:'1000000'
        });

        await item.methods.completeOrder('0').send({
            from:accounts[3],
            gas:'1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 99);
    });
})