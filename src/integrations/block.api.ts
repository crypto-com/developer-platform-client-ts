import { Block, BlockNumber } from '../lib/client/interfaces/block.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches the latest block number from the blockchain.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @returns {Promise<ApiResponse<BlockNumber>>} - A promise that resolves to the latest block number or throws an error if the request fails.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const latestBlock = await getCurrentBlock(apiKey);
 * console.log(latestBlock);
 */
export const getCurrentBlock = async (apiKey: string): Promise<ApiResponse<BlockNumber>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/block/current-block`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[blockApi/getCurrentBlock] - ${error.message}`);
    throw new Error(`Failed to fetch current block: ${error.message}`);
  }
};

/**
 * Fetches a block from the blockchain by its block tag or block number.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} blockTag - The block tag or block number to query (e.g., 'latest', 'pending', or a block number as hex string).
 * @param {string} [txDetail='false'] - Optional. Whether to include transaction details in the block response (true or false).
 * @returns {Promise<ApiResponse<Block>>} - A promise that resolves to the block data or throws an error if the request fails.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const block = await getBlockByTag(apiKey, 'latest', 'true');
 * console.log(block);
 */
export const getBlockByTag = async (
  apiKey: string,
  blockTag: string,
  txDetail: string = 'false'
): Promise<ApiResponse<Block>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/block/block-tag?blockTag=${blockTag}&txDetail=${txDetail}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[blockApi/getBlockByTag] - ${error.message}`);
    throw new Error(`Failed to fetch block by tag: ${error.message}`);
  }
};
