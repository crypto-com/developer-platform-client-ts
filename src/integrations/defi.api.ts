import { DefiProtocol, Farm, WhitelistedToken } from '../lib/client/interfaces/defi.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches whitelisted tokens for a specific DeFi protocol.
 */
export const getWhitelistedTokens = async (protocol: DefiProtocol): Promise<ApiResponse<WhitelistedToken[]>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/defi/whitelisted-tokens/${protocol}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
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
 */
export const getAllFarms = async (protocol: DefiProtocol): Promise<ApiResponse<Farm[]>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/defi/farms/${protocol}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
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
 * Fetches a specific farm by its symbol for a DeFi protocol.
 */
export const getFarmBySymbol = async (protocol: DefiProtocol, symbol: string): Promise<ApiResponse<Farm>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/defi/farms/${protocol}/${symbol}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
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
