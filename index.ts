const  Web3 = require('web3');

const web3 = new Web3('https://mainnet.infura.io/v3/314364a81eb349ab9e01421c289fa11e');

export async function getLastBlockNumber(): Promise<bigint>
{
    const blockNumber = await web3.eth.getBlockNumber();
    return blockNumber;
}


(async () => {
    const lastBlockNumber = await getLastBlockNumber()
    console.log(`Last Block Number: ${lastBlockNumber}`);
})();