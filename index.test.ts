import { getLastBlockNumber } from './index';

jest.mock('web3', () => {
 return jest.fn().mockImplementation(() => {
    return {
      eth: {
        getBlockNumber: jest.fn().mockResolvedValue(1234567),
      },
    };
 });
});

describe('Ethereum Info', () => {
 test('getLastBlockNumber returns the last block number', async () => {
    const blockNumber = await getLastBlockNumber();
    expect(blockNumber).toBe(1234567);
 });
});