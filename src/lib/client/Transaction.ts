import { ApiResponse } from '../../integrations/api.interfaces.js';
import {
  getTransactionByHash,
  getTransactionsByAddress,
  getTransactionStatus,
  getTransactionCount,
  getGasPrice,
  getFeeData,
  estimateGas,
} from '../../integrations/transaction.api.js';
import { Client } from './Client.js';
import {
  EstimateGasPayload,
  FeeData,
  GasLimit,
  GasPrice,
  TransactionByHash,
  TransactionCount,
  TransactionsByAddress,
  TransactionStatus,
} from './interfaces/transaction.interfaces.js';

/**
 * Transaction class handles blockchain transaction operations and queries.
 *
 * @class
 */
export class Transaction {
  /**
   * Fetches transactions for a specific wallet address.
   *
   * @async
   * @param {string} address - Wallet address (or CronosId `.cro`).
   * @param {string} explorerKey - Blockchain explorer API key.
   * @param {string} [session] - Pagination session.
   * @param {string} [limit='20'] - Result limit.
   * @param {number} [startBlock] - Start block (optional).
   * @param {number} [endBlock] - End block (optional).
   * @returns {Promise<ApiResponse<TransactionsByAddress>>}
   * @example
   * const transactions = await Transaction.getTransactionsByAddress('0x...', 'explorerKey');
   * console.log(transactions);
   */
  public static async getTransactionsByAddress(
    address: string,
    explorerKey: string,
    session: string = '',
    limit: string = '20',
    startBlock?: number,
    endBlock?: number
  ): Promise<ApiResponse<TransactionsByAddress>> {
    return await getTransactionsByAddress(
      Client.getApiKey(),
      address,
      explorerKey,
      session,
      limit,
      startBlock,
      endBlock
    );
  }

  /**
   * Fetches a transaction by hash.
   *
   * @async
   * @param {string} txHash - Transaction hash.
   * @returns {Promise<ApiResponse<TransactionByHash>>}
   * @example
   * const tx = await Transaction.getTransactionByHash('0x...');
   * console.log(tx);
   */
  public static async getTransactionByHash(txHash: string): Promise<ApiResponse<TransactionByHash>> {
    return await getTransactionByHash(Client.getApiKey(), txHash);
  }

  /**
   * Fetches transaction status by hash.
   *
   * @async
   * @param {string} txHash - Transaction hash.
   * @returns {Promise<ApiResponse<TransactionStatus>>}
   * @example
   * const status = await Transaction.getTransactionStatus('0x...');
   * console.log(status);
   */
  public static async getTransactionStatus(txHash: string): Promise<ApiResponse<TransactionStatus>> {
    return await getTransactionStatus(Client.getApiKey(), txHash);
  }

  /**
   * Fetches transaction count for a wallet.
   *
   * @async
   * @param {string} walletAddress - Wallet address.
   * @returns {Promise<ApiResponse<TransactionCount>>}
   * @example
   * const count = await Transaction.getTransactionCount('0x...');
   * console.log(count);
   */
  public static async getTransactionCount(walletAddress: string): Promise<ApiResponse<TransactionCount>> {
    return await getTransactionCount(Client.getApiKey(), walletAddress);
  }

  /**
   * Fetches current gas price.
   *
   * @async
   * @returns {Promise<ApiResponse<GasPrice>>}
   * @example
   * const gasPrice = await Transaction.getGasPrice();
   * console.log(gasPrice);
   */
  public static async getGasPrice(): Promise<ApiResponse<GasPrice>> {
    return await getGasPrice(Client.getApiKey());
  }

  /**
   * Fetches current fee data.
   *
   * @async
   * @returns {Promise<ApiResponse<FeeData>>}
   * @example
   * const feeData = await Transaction.getFeeData();
   * console.log(feeData);
   */
  public static async getFeeData(): Promise<ApiResponse<FeeData>> {
    return await getFeeData(Client.getApiKey());
  }

  /**
   * Estimates gas for a transaction.
   *
   * @async
   * @param {object} payload - Transaction payload (from, to, value, gasLimit, gasPrice, data).
   * @returns {Promise<ApiResponse<EstimateGasData>>}
   * @example
   * const estimation = await Transaction.estimateGas({ from: '0x...', to: '0x...', value: '1000000000000000000' });
   * console.log(estimation);
   */
  public static async estimateGas(payload: EstimateGasPayload): Promise<ApiResponse<GasLimit>> {
    return await estimateGas(Client.getApiKey(), payload);
  }
}
