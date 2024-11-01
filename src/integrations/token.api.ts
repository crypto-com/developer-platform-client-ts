import { TokenBalance } from '../lib/client/interfaces/explorer.interfaces.js';
import { Balance } from '../lib/client/interfaces/token.interfaces.js';
import { MagicLinkData } from '../lib/client/interfaces/transaction.interfaces.js';
import { ApiResponse, Method } from './api.interfaces.js';
import { BASE_URL } from './const.js';

/**
 * Fetches the native token balance of a specific address on a blockchain.
 *
 * @async
 * @function getNativeTokenBalance
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} address - The wallet address to fetch the native token balance for.
 * @param {string} apiKey - The API key used for authentication with the server.
 * @returns {Promise<ApiResponse<Balance>>} - A promise that resolves to the balance of the native token.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getNativeTokenBalance('240', '0x..', 'your-api-key');
 * console.log(balance);
 */
export const getNativeTokenBalance = async (
  chainId: string,
  address: string,
  apiKey: string
): Promise<ApiResponse<Balance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/${chainId}/native-token-balance?address=${address}&apiKey=${apiKey}`;

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
    console.error(`[tokenApi/getNativeTokenBalance] - ${error.message}`);
    throw new Error(`Failed to fetch native token balance: ${error.message}`);
  }
};

/**
 * Fetches the ERC20 token balance of a specific address for a given contract.
 *
 * @async
 * @function getERC20TokenBalance
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} address - The wallet address to fetch the ERC20 token balance for.
 * @param {string} contractAddress - The contract address of the ERC20 token.
 * @param {string} [blockHeight='latest'] - Optional. The block height to query (default is 'latest').
 * @param {string} apiKey - The API key used for authentication with the server.
 * @returns {Promise<ApiResponse<TokenBalance>>} - A promise that resolves to the balance of the ERC20 token.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getERC20TokenBalance('240', '0x...', '0x...', 'latest', 'your-api-key');
 * console.log(balance);
 */
export const getERC20TokenBalance = async (
  chainId: string,
  address: string,
  contractAddress: string,
  blockHeight: string = 'latest',
  apiKey: string
): Promise<ApiResponse<TokenBalance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/${chainId}/erc20-token-balance?address=${address}&contractAddress=${contractAddress}&blockHeight=${blockHeight}&apiKey=${apiKey}`;

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
    console.error(`[tokenApi/getERC20TokenBalance] - ${error.message}`);
    throw new Error(`Failed to fetch ERC20 token balance: ${error.message}`);
  }
};

/**
 * Sends a token transfer transaction to the blockchain.
 *
 * @async
 * @function transferToken
 * @param {string} chainId - The ID of the blockchain network.
 * @param {object} payload - The transaction payload including 'to' address, 'amount', and optional 'contractAddress'.
 * @param {string} [provider] - Optional. The provider URL for the blockchain network.
 * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
 * @throws {Error} Will throw an error if the transaction fails or the server responds with an error message.
 *
 * @example
 * const result = await transferToken('240', { to: '0x...', amount: 1 }, 'https://provider-url.com');
 * console.log(result);
 */
export const transferToken = async (
  chainId: string,
  payload: {
    to: string;
    amount: number;
    contractAddress?: string; // if not provided, this method initiates a native token transfer.
  },
  provider: string
): Promise<ApiResponse<MagicLinkData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/${chainId}/transfer`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, provider }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[tokenApi/transferToken] - ${error.message}`);
    throw new Error(`Failed to transfer token: ${error.message}`);
  }
};

/**
 * Sends a token wrap transaction to the blockchain.
 *
 * @async
 * @function wrapToken
 * @param {string} chainId - The ID of the blockchain network.
 * @param {object} payload - The transaction payload including 'amount', 'fromContractAddress', and 'toContractAddress'.
 * @param {string} [provider] - Optional. The provider URL for the blockchain network.
 * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
 * @throws {Error} Will throw an error if the transaction fails or the server responds with an error message.
 *
 * @example
 * const result = await wrapToken('1', { amount: 1, fromContractAddress: '0x...', toContractAddress: '0x...' }, 'https://provider-url.com');
 * console.log(result);
 */
export const wrapToken = async (
  chainId: string,
  payload: {
    amount: number;
  },
  provider: string
): Promise<ApiResponse<MagicLinkData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/${chainId}/wrap`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, provider }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[tokenApi/wrapToken] - ${error.message}`);
    throw new Error(`Failed to wrap token: ${error.message}`);
  }
};

/**
 * Sends a token swap transaction to the blockchain.
 *
 * @async
 * @function swapToken
 * @param {string} chainId - The ID of the blockchain network.
 * @param {object} payload - The transaction payload including 'amount', 'fromContractAddress', and 'toContractAddress'.
 * @param {string} [provider] - Optional. The provider URL for the blockchain network.
 * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
 * @throws {Error} Will throw an error if the transaction fails or the server responds with an error message.
 *
 * @example
 * const result = await swapToken('1', { amount: 1, fromContractAddress: '0x...', toContractAddress: '0x...' }, 'https://provider-url.com');
 * console.log(result);
 */
export const swapToken = async (
  chainId: string,
  payload: {
    amount: number;
    fromContractAddress: string;
    toContractAddress: string;
  },
  provider: string
): Promise<ApiResponse<MagicLinkData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/${chainId}/swap`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload, provider }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[tokenApi/swapToken] - ${error.message}`);
    throw new Error(`Failed to swap token: ${error.message}`);
  }
};
