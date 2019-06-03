Setup
==========
**Use this at your own risk. Please use throwaway addresses when using this as I have done nothing to secure the data being transferred. This is purely meant to fulfill the recurring job requests and nothing more.**
To use this there are a few things you will need to have. 
You might want to consider doing this on an aws instance to have 100% uptime.
1. Nodejs
2. An account made on a parity client and the corresponding password.
3. Docker for a parity network. **No networks will work other than a localhost parity node.**
4. A deployed contract using ATestnetConsumer.sol on remix or some other service. No need for the ABI, you only need the contract address.
5. Your oracle address.
6. A job ID of type RunLog.

---

Steps
===
1. Setting up your parity client. **If you already have a parity client running make sure you have the `Personal` ws-api enabled**
    * run ```docker run -h eth --name eth -p 8546:8546 -it parity/parity:stable --chain=ropsten --ws-interface=all --ws-origins="all" --ws-apis="all" --light --base-path /home/parity/.local/share/io.parity.ethereum/``` then press `ctr + p + q` to exit the docker container.
    * Move onto the next step while it syncs.
    * After it finishes syncing, run `docker exec -it eth /bin/bash` 
    * run `parity --chain ropsten account new`, enter a password and keep track of both the address and the password.
    * Press `ctr + d` to exit the shell.
    * Head over to your remix ATestnetConsumer contract and run the function `transferOwnership` using the newly generated address as the parameter.
    * Fund the contract with link and fund the new account with eth.

2. Clone this github depository and run `npm install` inside the directory.
3. After both steps 1 and 2 are completed run the following command, replacing your values where for each of the arguments: 

    ```npm run start -- --accountAddress="yourParityAddress" --password="yourPassword" --contractAddress="yourContractAddress" --oracleAddress="yourOracleAddress" --jobID="yourJobID" --providerURL="yourProviderAddress"```

    Note: If you are running your own ethereum address using the command I mentioned earlier, the provider address will be `ws://localhost:8546`

4. Press `ctr + z`, then type `bg`, then type `disown`.
5. You are now free to close the terminal. If this is being run on AWS you don't have to worry about it except for the link balance of the contract and the eth balance of the created account. If it is not on aws, avoid turning off the hardware it is running on.

