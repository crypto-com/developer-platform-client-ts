import { Log } from '../lib/client/interfaces/log.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Get the emitted events of a smart contract.
 *
 * @async
 * @returns {Promise<ApiResponse<Log[]>>} - return a list of decoded contract events.
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} address - The blockchain address to lookup
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const log = await getLogs('api_key', '0x0...');
 * console.log(log);
 */
export const getLogs = async (apiKey: string, address: string): Promise<ApiResponse<Log[]>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform//events?address=${address}`;

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
    console.error(`[event/getLogs] - ${error.message}`);
    throw new Error(`Failed to get event log: ${error.message}`);
  }
};
