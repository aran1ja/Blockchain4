let web3;
let contract;
let currentAccount;

const contractAddress = "0x89f7FA7ABC4DD39925fa098547D8737E3b935344";
const abi = [
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "orderId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "toyId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "totalPrice",
                    "type": "uint256"
                }
            ],
            "name": "OrderCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "orderId",
                    "type": "uint256"
                }
            ],
            "name": "OrderDelivered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "orderId",
                    "type": "uint256"
                }
            ],
            "name": "OrderPaid",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "orderId",
                    "type": "uint256"
                }
            ],
            "name": "OrderShipped",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "toyId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "stock",
                    "type": "uint256"
                }
            ],
            "name": "ToyAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_stock",
                    "type": "uint256"
                }
            ],
            "name": "addToy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_toyId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_quantity",
                    "type": "uint256"
                }
            ],
            "name": "createOrder",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_orderId",
                    "type": "uint256"
                }
            ],
            "name": "deliverOrder",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_toyId",
                    "type": "uint256"
                }
            ],
            "name": "getToyDetails",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "orderCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "orders",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "toyId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "enum ToyShop.OrderStatus",
                    "name": "status",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_orderId",
                    "type": "uint256"
                }
            ],
            "name": "shipOrder",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "toyCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "toys",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stock",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
];

// Prisijungimas prie kontrakto
const init = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        document.getElementById("connectedAccount").textContent = accounts[0];
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Contract Methods:", contract.methods);
        displayTeddyBear();
    } else {
        alert("Please install MetaMask to use this application.");
    }
};

// Testinio zaislo Teddy Bear informacija
const displayTeddyBear = () => {
    const toyListDiv = document.getElementById("toyList");
    toyListDiv.innerHTML = "";

    const toyDiv = document.createElement("div");
    toyDiv.className = "toy-item";
    toyDiv.innerHTML = `
        <h3>Teddy Bear</h3>
        <p>Price: 1 ETH</p>
        <p>Available Quantity: 10</p>
        <input type="number" id="buyQuantity" min="1" max="10" placeholder="Enter quantity to buy">
        <button onclick="createOrder(1, document.getElementById('buyQuantity').value)">Buy</button>
    `;
    toyListDiv.appendChild(toyDiv);
};

// Uzsakymas ir transakcija
async function createOrder(toyId, quantity) {
    try {
        quantity = parseInt(quantity); 

        // Patikriname, ar kiekis yra teisingas
        if (quantity <= 0) {
            alert("Please enter a valid quantity greater than 0.");
            return;
        }

        if (quantity > 10) {
            alert("There are not enough toys available. Maximum quantity is 10.");
            return;
        }

        // Nustatome zaislo kaina rankiniu budu (1 ETH)
        const toyPrice = web3.utils.toWei("1", "ether"); 
        const totalPrice = web3.utils.toBN(toyPrice).mul(web3.utils.toBN(quantity)); // Kaina * kiekis

        if (!currentAccount) {
            const accounts = await web3.eth.getAccounts();
            currentAccount = accounts[0];
            if (!currentAccount) {
                alert("Please connect your MetaMask account.");
                return;
            }
        }

        // Siųskite transakciją ir gaukite receipt
        const receipt = await web3.eth.sendTransaction({
            from: currentAccount, 
            to: contractAddress, 
            value: totalPrice.toString(), 
            gas: 3000000 
        });

        console.log("Transaction receipt:", receipt);

        // Patikrinkite siuntėjo balansą po transakcijos
        const balanceAfter = await web3.eth.getBalance(currentAccount);
        console.log("Sender's Balance after transaction:", web3.utils.fromWei(balanceAfter, "ether"));
        document.getElementById("userBalance").textContent = `Balance: ${web3.utils.fromWei(balanceAfter, "ether")} ETH`;

        alert("Order created successfully!");
    } catch (error) {
        console.error("Error creating order:", error.message || error);
        alert("Failed to create order. See console for details.");
    }
}


document.getElementById("connectButton").addEventListener("click", init);
