import { Balance } from '../lib/client/interfaces/token.interfaces.js';
import { WalletData } from '../lib/client/interfaces/wallet.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Creates a new wallet using the API.
 *
 * @async
 * @throws Will throw an error if the wallet creation fails or the server responds with an error.
 * @param {string} apiKey - The API key used for authentication with the server.
 * @returns {Promise<ApiResponse<WalletData>>} - The newly created wallet information.
 * @throws {Error} Will throw an error if the create wallet request fails or the server responds with an error message.
 *
 * @example
 * const newWallet = await createWallet('api_key');
 * console.log(newWallet);
 */
export const createWallet = async (apiKey: string): Promise<ApiResponse<WalletData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/wallet`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
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
    console.error(`[walletApi/createWallet] - ${error.message}`);
    throw new Error(`Failed to create wallet: ${error.message}`);
  }
};

/**
 * Fetches the native token balance of a wallet.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} walletAddress - The wallet address to check the balance for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
 * @returns {Promise<ApiResponse<Balance>>} - The native token balance of the wallet.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getBalance('api_key', '0x...');
 * console.log(balance);
 */

export const getBalance = async (apiKey: string, walletAddress: string): Promise<ApiResponse<Balance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/wallet/balance?walletAddress=${walletAddress}`;

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
    console.error(`[walletApi/getBalance] - ${error.message}`);
    throw new Error(`Failed to fetch wallet balance: ${error.message}`);
  }
};
