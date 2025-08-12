import { ContractCode } from '../lib/client/interfaces/contract.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches the bytecode of a specific contract by its address on a particular blockchain network.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} contractAddress - The contract address on the blockchain for which the bytecode needs to be fetched.
 * @returns {Promise<ApiResponse<GetContractCode>>} - A promise that resolves to the bytecode of the contract or throws an error if the request fails.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const code = await getContractCode(apiKey, '0x...');
 * console.log(code);
 */
export const getContractCode = async (apiKey: string, contractAddress: string): Promise<ApiResponse<ContractCode>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/contract/contract-code?contractAddress=${contractAddress}`;

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
    console.error(`[contractApi/getContractCode] - ${error.message}`);
    throw new Error(`Failed to fetch contract code: ${error.message}`);
  }
};
