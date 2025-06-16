import { ApiResponse } from '../../integrations/api.interfaces.js';
import { getBlockByTag, getCurrentBlock } from '../../integrations/block.api.js';
import { Client } from './Client.js';
import { GetBlockByTag, GetCurrentBlock } from './interfaces/block.interfaces.js';

/**
 * Block class for accessing blockchain block data.
 */
export class Block {
  /**
   * Get the current latest block.
   *
   * @returns A promise that resolves to the current block data.
   */
  public static async getCurrentBlock(): Promise<ApiResponse<GetCurrentBlock>> {
    return await getCurrentBlock(Client.getApiKey());
  }

  /**
   * Get a block by tag or block number.
   *
   * @param blockTag - Block identifier ('latest', 'pending', or block number in hex).
   * @param txDetail - Whether to include transaction details ('true' or 'false').
   * @returns A promise that resolves to the block data.
   */
  public static async getBlockByTag(blockTag: string, txDetail: string = 'false'): Promise<ApiResponse<GetBlockByTag>> {
    return await getBlockByTag(Client.getApiKey(), blockTag, txDetail);
  }
}
