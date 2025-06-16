import {
  TransactionByHash,
  TransactionsByAddress,
  TransactionStatus,
  TransactionCount,
  GasPrice,
  FeeData,
  EstimateGasPayload,
  GasLimit,
} from '../lib/client/interfaces/transaction.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches transactions for a specific wallet address.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} address - Wallet address (CronosIds supported, e.g. `xyz.cro`).
 * @param {string} explorerKey - Blockchain explorer API key.
 * @param {string} session - Pagination session.
 * @param {string} limit - Number of transactions to fetch.
 * @param {number} [startBlock] - Start block number.
 * @param {number} [endBlock] - End block number.
 * @returns {Promise<ApiResponse<TransactionsByAddress>>} - A promise that resolves to transactions.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await getTransactionsByAddress(apiKey, '0x...', 'explorerKey');
 * console.log(res);
 */
export const getTransactionsByAddress = async (
  apiKey: string,
  address: string,
  explorerKey: string,
  session: string,
  limit: string,
  startBlock?: number,
  endBlock?: number
): Promise<ApiResponse<TransactionsByAddress>> => {
  const params = new URLSearchParams({
    address,
    explorerKey,
    session,
    limit,
  });

  if (startBlock !== undefined) params.append('startBlock', startBlock.toString());
  if (endBlock !== undefined) params.append('endBlock', endBlock.toString());

  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/address?${params.toString()}`;

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
    console.error(`[transactionApi/getTransactionsByAddress] - ${error.message}`);
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }
};

/**
 * Fetches a transaction by its hash.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} txHash - Transaction hash.
 * @returns {Promise<ApiResponse<TransactionByHash>>} - A promise that resolves to transactions.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await getTransactionByHash(apiKey, '0x...');
 * console.log(res);
 */
export const getTransactionByHash = async (apiKey: string, txHash: string): Promise<ApiResponse<TransactionByHash>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/tx-hash?txHash=${txHash}`;

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
    console.error(`[transactionApi/getTransactionByHash] - ${error.message}`);
    throw new Error(`Failed to fetch transaction: ${error.message}`);
  }
};

/**
 * Fetches the transaction status by hash.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} txHash - Transaction hash.
 * @returns {Promise<ApiResponse<TransactionStatus>>} - A promise that resolves to the transaction status.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await getTransactionStatus(apiKey, '0x...');
 * console.log(res);
 */
export const getTransactionStatus = async (apiKey: string, txHash: string): Promise<ApiResponse<TransactionStatus>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/status?txHash=${txHash}`;

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
    console.error(`[transactionApi/getTransactionStatus] - ${error.message}`);
    throw new Error(`Failed to fetch transaction status: ${error.message}`);
  }
};

/**
 * Fetches transaction count for a wallet address.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} walletAddress - Wallet address.
 * @returns {Promise<ApiResponse<TransactionCount>>} - A promise that resolves to the transaction count.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await getTransactionCount(apiKey, '0x...');
 * console.log(res);
 */
export const getTransactionCount = async (
  apiKey: string,
  walletAddress: string
): Promise<ApiResponse<TransactionCount>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/tx-count?walletAddress=${walletAddress}`;

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
    console.error(`[transactionApi/getTransactionCount] - ${error.message}`);
    throw new Error(`Failed to fetch transaction count: ${error.message}`);
  }
};

/**
 * Fetches current gas price.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @returns {Promise<ApiResponse<GasPriceData>>} - A promise that resolves to the gas price of a potential transaction.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await getGasPrice(apiKey);
 * console.log(res);
 */
export const getGasPrice = async (apiKey: string): Promise<ApiResponse<GasPrice>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/gas-price`;

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
    console.error(`[transactionApi/getGasPrice] - ${error.message}`);
    throw new Error(`Failed to fetch gas price: ${error.message}`);
  }
};

/**
 * Fetches current fee data.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @returns {Promise<ApiResponse<FeeData>>} - A promise that resolves to the fee data.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await getFeeData(apiKey);
 * console.log(res);
 */
export const getFeeData = async (apiKey: string): Promise<ApiResponse<FeeData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/fee-data`;

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
    console.error(`[transactionApi/getFeeData] - ${error.message}`);
    throw new Error(`Failed to fetch fee data: ${error.message}`);
  }
};

/**
 * Estimates gas for a transaction.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {EstimateGasPayload} payload - Transaction payload (from, to, value, gasLimit, gasPrice, data).
 * @returns {Promise<ApiResponse<EstimateGasData>>} - A promise that resolves to the gas estimation.
 * @throws {Error} Will throw if request fails.
 *
 * @example
 * const res = await estimateGas(apiKey, { from: '0x...', to: '0x...', value: '1000000000000000000' });
 * console.log(res);
 */
export const estimateGas = async (apiKey: string, payload: EstimateGasPayload): Promise<ApiResponse<GasLimit>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/transaction/estimate-gas`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[transactionApi/estimateGas] - ${error.message}`);
    throw new Error(`Failed to estimate gas: ${error.message}`);
  }
};
