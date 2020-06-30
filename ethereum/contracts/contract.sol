// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;

contract Deployer {
    
    address[] public deployedItems;
    mapping(address => address[]) products;
    
    function deployItem(string memory itemName,string memory itemDescription,uint itemPrice,uint itemQuantity) public {
        require(itemQuantity > 0 && itemPrice > 100);
        
        address newItem = address(new Seller(itemName,itemDescription, itemPrice, itemQuantity, msg.sender));
        products[msg.sender].push(newItem);
        
        deployedItems.push(newItem);
    }

    function getContracts(address seller) public view returns (address[] memory) {
        return(products[seller]);
    }
    
    function getDeployedItems() public view returns(address[] memory) {
        return(deployedItems);
    }
    
}

contract Seller {
    
    struct Order{
        uint qty;
        uint value;
        address payable orderer;
        bool complete;
        bool approved;
        bool declined;
    }
    
    mapping(address => uint[]) buyer;
    mapping(address => bool) buyerExists;
    Order[] public orders;
    uint public price;
    string public description;
    string public name;
    address payable public seller;
    uint public quantity;
    
    constructor(string memory itemName,string memory itemDescription,uint itemPrice,uint itemQuantity, address payable creator) 
    public {
        name = itemName;
        description = itemDescription;
        price = itemPrice;
        quantity = itemQuantity;
        seller = creator;
    }
    
    modifier restricted {
        require(seller == msg.sender);
        _;
    }
    
    function editQty(uint newQty) public restricted {
        quantity = newQty;
    } 
    
    function orderItem(uint orderQuantity) public payable{
        require(quantity >= orderQuantity);
        require(orderQuantity*price == msg.value);
        require(orderQuantity > 0);
        
        Order memory newOrder = Order ({
            orderer: msg.sender,
            value: price,
            qty: orderQuantity,
            complete: false,
            approved: false,
            declined: false
        });
        
        buyer[msg.sender].push(orders.length);
        buyerExists[msg.sender] = true;
        
        orders.push(newOrder);
        quantity = quantity - orderQuantity;
    }
    
    function approveOrder(uint index) public restricted {
        
        Order storage order = orders[index];
        require(!order.approved);
        require(buyerExists[order.orderer]);      //Checking if address is a buyer
        
        order.approved = true;
    }
    
    function declinedOrder(uint index) public restricted {
        Order storage order = orders[index];
        require(!order.approved);
        require(buyerExists[order.orderer]);      //Checking if address is a buyer
        order.orderer.transfer(order.value*order.qty);
        editQty(quantity + order.qty);
        order.declined = true;
    }


    function numberOfOrders() public view returns(uint) {
        return orders.length;
    }
    
    
    function completeOrder(uint index) public {
        Order storage order = orders[index];
        require(!order.declined);
        require(order.orderer == msg.sender);       //Checking if function called by the person who ordered
        require(!order.complete);                   //Checking if order already isn't complete 
        require(order.approved);        //Checking if the order is approved 
        
        seller.transfer(order.value*order.qty);
        order.complete = true;
    }
    
    function retrieveItem() public view returns(string memory,string memory,uint,uint,address) {
        return (
            name,
            description,
            price,
            quantity,
            seller
        );
    }

    function orderCount() public view returns(uint) {
        return orders.length;
    }

    function existence(address buy) public view returns(bool) {
        return buyerExists[buy];
    }

    function orderRetrival(address buy) public view returns(uint[] memory) {
        return buyer[buy];
    }
}