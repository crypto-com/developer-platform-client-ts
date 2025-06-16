import { LookupAddress, ResolveName } from '../lib/client/interfaces/cronosid.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse } from './api.interfaces.js';

/**
 * Resolves a CronosId to its corresponding blockchain address
 *
 * @async
 * @function resolveName
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} name - The CronosId name to resolve
 * @returns {Promise<ApiResponse<ResolveName>>} - A promise that resolves to the blockchain address
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message
 *
 * @example
 * const address = await resolveName('example.cro');
 * console.log(address); // '0x...'
 */
export const resolveName = async (apiKey: string, name: string): Promise<ApiResponse<ResolveName>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/cronosid/resolve/${name}`;

  try {
    const response = await fetch(url, {
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
    console.error(`[cronosidApi/resolveName] - ${error.message}`);
    throw new Error(`Failed to resolve name: ${error.message}`);
  }
};

/**
 * Looks up an address to find its associated CronosId
 *
 * @async
 * @function lookupAddress
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} address - The blockchain address to lookup
 * @returns {Promise<ApiResponse<LookupAddress>>} - A promise that resolves to the CronosId name
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message
 *
 * @example
 * const name = await lookupAddress('0x...');
 * console.log(name); // 'example.cro'
 */
export const lookupAddress = async (apiKey: string, address: string): Promise<ApiResponse<LookupAddress>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/cronosid/lookup/${address}`;

  try {
    const response = await fetch(url, {
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
    console.error(`[cronosidApi/lookupAddress] - ${error.message}`);
    throw new Error(`Failed to lookup address: ${error.message}`);
  }
};
