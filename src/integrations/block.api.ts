import { GetBlockByTag } from '../lib/client/interfaces/block.interfaces.js';
import { ApiResponse, Method } from './api.interfaces.js';
import { BASE_URL } from './const.js';
/**
 * Fetches a block by tag or block number.
 *
 * @async
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} blockTag - The block tag (e.g., 'latest').
 * @param {string} [txDetail] - Optional. Include detailed transaction data.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<ApiResponse<GetBlockByTag>>} - The block data.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const blockData = await getBlockByTag('1', 'latest', '', 'your-api-key');
 * console.log(blockData);
 */
export const getBlockByTag = async (
  chainId: string,
  blockTag: string,
  txDetail: string = '',
  apiKey: string
): Promise<ApiResponse<GetBlockByTag>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/block/${chainId}/block-tag?blockTag=${blockTag}&txDetail=${txDetail}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
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
    console.error(`[transactionApi/getBlockByTag] - ${error.message}`);
    throw new Error(`Failed to fetch block by tag: ${error.message}`);
  }
};
