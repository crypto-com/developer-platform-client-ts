import { ApiResponse } from '../../integrations/api.interfaces.js';
import { getBlockByTag } from '../../integrations/block.api.js';
import { Client } from './Client.js';
import { GetBlockByTag } from './interfaces/block.interfaces.js';

/**
 * Block class handles operations related to fetching transaction data,
 * such as fetching transactions by address, by hash, getting transaction status, and fetching block data.
 *
 * @class
 */
export class Block {
  /**
   * Fetches a block by its tag or block number.
   *
   * @async
   * @param {string} blockTag - The block tag or block number (e.g., 'latest', 'earliest', or a specific block number).
   * @param {string} [txDetail] - Optional. Whether to include detailed transaction data (default is false).
   * @returns {Promise<ApiResponse<GetBlockByTag>>} - A promise that resolves to the block data.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const block = await Block.getBlockByTag('latest');
   * console.log(block);
   */
  public static async getBlockByTag(blockTag: string, txDetail?: string): Promise<ApiResponse<GetBlockByTag>> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getBlockByTag(chainId, blockTag, txDetail, apiKey);
  }
}
