import { ApiResponse } from '../../integrations/api.interfaces.js';
import {
  getTransactionByHash,
  getTransactionsByAddress,
  getTransactionStatus,
} from '../../integrations/transaction.api.js';
import { Client } from './Client.js';
import {
  GetTransactionByHashData,
  GetTransactionsByAddressData,
  GetTransactionStatusData,
} from './interfaces/transaction.interfaces.js';

/**
 * Transaction class handles operations related to fetching transaction data,
 * such as fetching transactions by address, by hash, getting transaction status, and fetching block data.
 *
 * @class
 */
export class Transaction {
  /**
   * Fetches transactions for a specific wallet address.
   *
   * @async
   * @param {string} address - The wallet address to fetch transactions for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
   * @param {number} startBlock - The starting block number to fetch transactions from. (The maximum number of blocks that can be fetched is 10,000)
   * @param {number} endBlock - The ending block number to fetch transactions to. (The maximum number of blocks that can be fetched is 10,000)
   * @param {string} [session] - Optional. Session token for pagination (default is an empty string).
   * @param {string} [limit] - Optional. Limit for the number of transactions to fetch (default is 20).
   * @returns {Promise<ApiResponse<GetTransactionsByAddressData>>} - A promise that resolves to the transaction data for the specified address.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const transactions = await Transaction.getTransactionsByAddress('0x...', 10000, 20000);
   * console.log(transactions);
   */
  public static async getTransactionsByAddress(
    address: string,
    startBlock: number,
    endBlock: number,
    session?: string,
    limit?: string
  ): Promise<ApiResponse<GetTransactionsByAddressData>> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getTransactionsByAddress(chainId, address, startBlock, endBlock, session, limit, apiKey);
  }

  /**
   * Fetches a transaction by its hash.
   *
   * @async
   * @param {string} txHash - The transaction hash to fetch the transaction details for.
   * @returns {Promise<ApiResponse<GetTransactionByHashData>>} - A promise that resolves to the transaction data.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const transaction = await Transaction.getTransactionByHash('0x...');
   * console.log(transaction);
   */
  public static async getTransactionByHash(txHash: string): Promise<ApiResponse<GetTransactionByHashData>> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getTransactionByHash(chainId, txHash, apiKey);
  }

  /**
   * Fetches the status of a transaction by its hash.
   *
   * @async
   * @param {string} txHash - The transaction hash to check the status for.
   * @returns {Promise<ApiResponse<GetTransactionStatusData>>} - A promise that resolves to the transaction status.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const status = await Transaction.getTransactionStatus('0x...');
   * console.log(status);
   */
  public static async getTransactionStatus(txHash: string): Promise<ApiResponse<GetTransactionStatusData>> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getTransactionStatus(chainId, txHash, apiKey);
  }
}
