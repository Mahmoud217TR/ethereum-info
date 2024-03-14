import { getLastBlockNumber, balance } from './index';

jest.mock('web3', () => {
 return jest.fn().mockImplementation(() => {
    return {
      eth: {
        getBlockNumber: jest.fn().mockResolvedValue(1234567),
        Contract: jest.fn().mockImplementation(() => {
          return {
            methods: {
              balanceOf: jest.fn().mockImplementation(() => {
                return {
                 call: jest.fn().mockResolvedValue('1000000000000000000'),
                };
              }),
            },
          };
        }),
      },
      utils: {
        fromWei: jest.fn().mockReturnValue('1000'),
      },
    };
 });
});

describe('Ethereum Info', () => {
 test('getLastBlockNumber returns the last block number', async () => {
    const blockNumber = await getLastBlockNumber();
    expect(blockNumber).toBe(1234567);
 });

 test('balance returns the USDT balance of a given address', async () => {
    const amount = await balance('0x53FcbB0DA498BC3A5aDBDDD1c51dEE6dB02c2AC9');
    expect(amount).toBe('1000');
 });
});