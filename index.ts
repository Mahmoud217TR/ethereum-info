const  Web3 = require('web3');

const web3 = new Web3('https://mainnet.infura.io/v3/314364a81eb349ab9e01421c289fa11e');

export async function getLastBlockNumber(): Promise<bigint>
{
    const blockNumber = await web3.eth.getBlockNumber();
    return blockNumber;
}

export async function balance(address): Promise<string>
{
    const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    const usdtContractABI = [
        {
            "constant": true,
            "inputs": [{
                "name": "_owner",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "name": "balance",
                "type": "uint256"
            }],
            "type": "function"
        }
    ];
    const usdtContract = new web3.eth.Contract(usdtContractABI, usdtContractAddress);
    const balance: number = await usdtContract.methods.balanceOf(address).call();
    return web3.utils.fromWei(balance, 'ether');
}

(async () => {
    const lastBlockNumber = await getLastBlockNumber()
    console.log(`Last Block Number: ${lastBlockNumber}`);
    
    const address = '0x53FcbB0DA498BC3A5aDBDDD1c51dEE6dB02c2AC9';
    const amount = await balance(address);
    console.log(`balance: ${amount}`);
})();