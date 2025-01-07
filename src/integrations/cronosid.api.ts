import { Client } from '../lib/client/Client.js';
import { LookupAddressResponse, ResolveNameResponse } from '../lib/client/interfaces/cronosid.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse } from './api.interfaces.js';

/**
 * Resolves a CronosId to its corresponding blockchain address
 *
 * @async
 * @function resolveName
 * @param {string} name - The CronosId name to resolve
 * @returns {Promise<string>} - A promise that resolves to the blockchain address
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message
 *
 * @example
 * const address = await resolveName('example.cro');
 * console.log(address); // '0x...'
 */
export const resolveName = async (name: string): Promise<ApiResponse<ResolveNameResponse>> => {
  const chainId = Client.getChainId();
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/cronosid/resolve/${name}?chainId=${chainId}`;

  try {
    const response = await fetch(url, {
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
    console.error(`[cronosidApi/resolveName] - ${error.message}`);
    throw new Error(`Failed to resolve name: ${error.message}`);
  }
};

/**
 * Looks up an address to find its associated CronosId
 *
 * @async
 * @function lookupAddress
 * @param {string} address - The blockchain address to lookup
 * @returns {Promise<string>} - A promise that resolves to the CronosId name
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message
 *
 * @example
 * const name = await lookupAddress('0x...');
 * console.log(name); // 'example.cro'
 */
export const lookupAddress = async (address: string): Promise<ApiResponse<LookupAddressResponse>> => {
  const chainId = Client.getChainId();
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/cronosid/lookup/${address}?chainId=${chainId}`;

  try {
    const response = await fetch(url, {
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
    console.error(`[cronosidApi/lookupAddress] - ${error.message}`);
    throw new Error(`Failed to lookup address: ${error.message}`);
  }
};
