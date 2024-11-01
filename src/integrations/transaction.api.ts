import {
  GetTransactionByHashData,
  GetTransactionsByAddressData,
  GetTransactionStatusData,
} from '../lib/client/interfaces/transaction.interfaces.js';
import { ApiResponse, Method } from './api.interfaces.js';
import { BASE_URL } from './const.js';

/**
 * Fetches transactions for a specific wallet address.
 *
 * @async
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} address - The wallet address to fetch transactions for (e.g., 0x...).
 * @param {string} [session] - Optional. The pagination session token.
 * @param {string} [limit='20'] - Optional. The number of transactions to fetch.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<ApiResponse<GetTransactionsByAddressData>>} - The transactions data.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const transactions = await getTransactionsByAddress('1', '0x...', '', '10', 'your-api-key');
 * console.log(transactions);
 */
export const getTransactionsByAddress = async (
  chainId: string,
  address: string,
  session: string = '',
  limit: string = '20',
  apiKey: string
): Promise<ApiResponse<GetTransactionsByAddressData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/${chainId}/address?address=${address}&session=${session}&limit=${limit}&apiKey=${apiKey}`;

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
    console.error(`[transactionApi/getTransactionsByAddress] - ${error.message}`);
    throw new Error(`Failed to fetch transactions by address: ${error.message}`);
  }
};

/**
 * Fetches a transaction by its hash.
 *
 * @async
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} txHash - The transaction hash (e.g., 0x...).
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<ApiResponse<GetTransactionByHashData>>} - The transaction data.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const transactionData = await getTransactionByHash('1', '0x...', 'your-api-key');
 * console.log(transactionData);
 */
export const getTransactionByHash = async (
  chainId: string,
  txHash: string,
  apiKey: string
): Promise<ApiResponse<GetTransactionByHashData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/${chainId}/tx-hash?txHash=${txHash}&apiKey=${apiKey}`;

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
    console.error(`[transactionApi/getTransactionByHash] - ${error.message}`);
    throw new Error(`Failed to fetch transaction by hash: ${error.message}`);
  }
};

/**
 * Fetches the status of a transaction by its hash.
 *
 * @async
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} txHash - The transaction hash (e.g., 0x...).
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<ApiResponse<GetTransactionStatusData>>} - The transaction status.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const transactionStatus = await getTransactionStatus('1', '0x...', 'your-api-key');
 * console.log(transactionStatus);
 */
export const getTransactionStatus = async (
  chainId: string,
  txHash: string,
  apiKey: string
): Promise<ApiResponse<GetTransactionStatusData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/${chainId}/status?txHash=${txHash}&apiKey=${apiKey}`;

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
    console.error(`[transactionApi/getTransactionStatus] - ${error.message}`);
    throw new Error(`Failed to fetch transaction status: ${error.message}`);
  }
};
