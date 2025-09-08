import { ClientVersion, ChainId, Info } from '@/lib/client/interfaces/network.interface.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Get Network information.
 *
 * @async
 * @returns {Promise<ApiResponse<Info>>} - return network information.
 * @param {string} apiKey - The API key used for authentication with the server.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const info = await getNetworkInfo('api_key');
 * console.log(info);
 */
export const getNetworkInfo = async (apiKey: string): Promise<ApiResponse<Info>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/network/info`;

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
    console.error(`[network/getNetworkInfo] - ${error.message}`);
    throw new Error(`Failed to get network info: ${error.message}`);
  }
};

/**
 * Get Chain ID.
 *
 * @async
 * @returns {Promise<ApiResponse<ChainId>>} - return chain id.
 * @param {string} apiKey - The API key used for authentication with the server.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const chainId = await getChainId('api_key');
 * console.log(chainId);
 */
export const getChainId = async (apiKey: string): Promise<ApiResponse<ChainId>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/network/chain-id`;

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
    console.error(`[network/getChainId] - ${error.message}`);
    throw new Error(`Failed to get chain id: ${error.message}`);
  }
};

/**
 * Get client version.
 *
 * @async
 * @returns {Promise<ApiResponse<ClientVersion>>} - return client version.
 * @param {string} apiKey - The API key used for authentication with the server.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const clientVersion = await getClientVersion('api_key');
 * console.log(clientVersion);
 */
export const getClientVersion = async (apiKey: string): Promise<ApiResponse<ClientVersion>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/network/client-version`;

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
    console.error(`[network/getChainId] - ${error.message}`);
    throw new Error(`Failed to get chain id: ${error.message}`);
  }
};
