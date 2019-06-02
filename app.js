const Web3 = require('web3')
let { accountAddress, password, contractAddress, oracleAddress, jobID, providerURL} = require("yargs").argv;
let { abi } = require("./variables")

const options = {
    defaultAccount: accountAddress,
    defaultBlock: 'latest',
    defaultGas: 4000000,
    defaultGasPrice: '30000000000',
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 24,
    transactionPollingTimeout: 480
}


let provider = new Web3.providers.WebsocketProvider(providerURL)


const web3 = new Web3(provider, null, options)




deploy = async function() {
    
    
    let contractOptions = {
        address: contractAddress
    }
    web3.eth.personal.unlockAccount(accountAddress, password, null)
    .then((res) => {
    }).catch(e => {
        console.log(e);  
    })
    let contract = await web3.eth.Contract(abi, contractAddress, contractOptions)
    let mymethod = await contract.methods.requestEthereumPrice(oracleAddress, jobID)
    try {
        console.log("Sending Request.");
        mymethod.send()
    } catch (error) {
        console.log(error);  
    }
    
    setTimeout(() => {
        deploy() 
    }, 595000)
}


//initiates the loop
deploy();