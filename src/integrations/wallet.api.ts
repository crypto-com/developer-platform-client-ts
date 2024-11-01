import { Balance } from '../lib/client/interfaces/token.interfaces.js';
import { CreateWalletData } from '../lib/client/interfaces/wallet.interfaces.js';
import { ApiResponse, Method } from './api.interfaces.js';
import { BASE_URL } from './const.js';

/**
 * Creates a new wallet using the API.
 *
 * @async
 * @throws Will throw an error if the wallet creation fails or the server responds with an error.
 * @returns {Promise<ApiResponse<CreateWalletData>>} - The newly created wallet information.
 * @throws {Error} Will throw an error if the create wallet request fails or the server responds with an error message.
 *
 * @example
 * const newWallet = await createWallet();
 * console.log(newWallet);
 */
export const createWallet = async (): Promise<ApiResponse<CreateWalletData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/wallet`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
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
    console.error(`[walletApi/createWallet] - ${error.message}`);
    throw new Error(`Failed to create wallet: ${error.message}`);
  }
};

/**
 * Fetches the native token balance of a wallet.
 *
 * @async
 * @param {string} chainId - The ID of the blockchain network (e.g., Ethereum, Cronos).
 * @param {string} address - The wallet address to check the balance for (e.g., 0x...).
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<ApiResponse<Balance>>} - The native token balance of the wallet.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getBalance('1', '0x...');
 * console.log(balance);
 */

export const getBalance = async (chainId: string, address: string, apiKey: string): Promise<ApiResponse<Balance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/wallet/${chainId}/balance?address=${address}&apiKey=${apiKey}`;

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
    console.error(`[walletApi/getBalance] - ${error.message}`);
    throw new Error(`Failed to fetch wallet balance: ${error.message}`);
  }
};
