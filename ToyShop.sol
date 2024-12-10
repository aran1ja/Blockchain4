// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToyShop {
    enum OrderStatus { Pending, Paid, Shipped, Delivered }

    struct Toy {
        string name;
        uint256 price;
        uint256 stock;
    }

    struct Order {
        address buyer;
        uint256 toyId;
        uint256 quantity;
        uint256 totalPrice;
        OrderStatus status;
    }

    mapping(uint256 => Toy) public toys;
    mapping(uint256 => Order) public orders;
    uint256 public toyCount;
    uint256 public orderCount;
    address public owner;

    event ToyAdded(uint256 toyId, string name, uint256 price, uint256 stock);
    event OrderCreated(uint256 orderId, address buyer, uint256 toyId, uint256 quantity, uint256 totalPrice);
    event OrderPaid(uint256 orderId);
    event OrderShipped(uint256 orderId);
    event OrderDelivered(uint256 orderId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addToy(string memory _name, uint256 _price, uint256 _stock) external onlyOwner {
        toyCount++;
        toys[toyCount] = Toy(_name, _price, _stock);
        emit ToyAdded(toyCount, _name, _price, _stock);
    }

    function createOrder(uint256 _toyId, uint256 _quantity) external payable {
        Toy storage toy = toys[_toyId];
        require(toy.stock >= _quantity, "Not enough stock available");
        uint256 totalPrice = toy.price * _quantity;
        require(msg.value == totalPrice, "Incorrect payment amount");

        orderCount++;
        toy.stock -= _quantity;
        orders[orderCount] = Order(msg.sender, _toyId, _quantity, totalPrice, OrderStatus.Paid);
        emit OrderCreated(orderCount, msg.sender, _toyId, _quantity, totalPrice);
        emit OrderPaid(orderCount);
    }

    function shipOrder(uint256 _orderId) external onlyOwner {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Paid, "Order is not in the correct state");
        order.status = OrderStatus.Shipped;
        emit OrderShipped(_orderId);
    }

    function deliverOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Shipped, "Order is not in the correct state");
        require(msg.sender == order.buyer, "Only the buyer can confirm delivery");

        order.status = OrderStatus.Delivered;
        emit OrderDelivered(_orderId);
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}