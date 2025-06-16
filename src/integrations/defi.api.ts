import { DefiProtocol, Farm, WhitelistedToken } from '../lib/client/interfaces/defi.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches whitelisted tokens for a specific DeFi protocol.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {DefiProtocol} protocol - The DeFi protocol for which to fetch whitelisted tokens.
 * @returns {Promise<ApiResponse<WhitelistedToken[]>>} - A promise that resolves to an array of whitelisted tokens wrapped in an ApiResponse.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const tokens = await getWhitelistedTokens(apiKey, 'Uniswap');
 * console.log(tokens.data);
 */
export const getWhitelistedTokens = async (
  apiKey: string,
  protocol: DefiProtocol
): Promise<ApiResponse<WhitelistedToken[]>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/defi/whitelisted-tokens/${protocol}`;

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
      throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[defiApi/getWhitelistedTokens] - ${error.message}`);
    throw new Error(`Failed to fetch whitelisted tokens: ${error.message}`);
  }
};

/**
 * Fetches all farms for a specific DeFi protocol.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {DefiProtocol} protocol - The DeFi protocol for which to fetch farms.
 * @returns {Promise<ApiResponse<Farm[]>>} - A promise that resolves to an array of farms wrapped in an ApiResponse.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const farms = await getAllFarms(apiKey, 'Uniswap');
 * console.log(farms.data);
 */
export const getAllFarms = async (apiKey: string, protocol: DefiProtocol): Promise<ApiResponse<Farm[]>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/defi/farms/${protocol}`;

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
      throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[defiApi/getAllFarms] - ${error.message}`);
    throw new Error(`Failed to fetch farms: ${error.message}`);
  }
};

/**
 * Fetches a specific farm by its symbol for a given DeFi protocol.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {DefiProtocol} protocol - The DeFi protocol in which the farm exists.
 * @param {string} symbol - The symbol of the farm to fetch.
 * @returns {Promise<ApiResponse<Farm>>} - A promise that resolves to the farm details wrapped in an ApiResponse.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const farm = await getFarmBySymbol(apiKey, 'Uniswap', 'UNI-ETH-LP');
 * console.log(farm.data);
 */
export const getFarmBySymbol = async (
  apiKey: string,
  protocol: DefiProtocol,
  symbol: string
): Promise<ApiResponse<Farm>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/defi/farms/${protocol}/${symbol}`;

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
      throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[defiApi/getFarmBySymbol] - ${error.message}`);
    throw new Error(`Failed to fetch farm: ${error.message}`);
  }
};
