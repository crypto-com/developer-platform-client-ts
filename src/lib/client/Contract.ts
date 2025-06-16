import { ApiResponse } from '../../integrations/api.interfaces.js';
import { getContractABI, getContractCode } from '../../integrations/contract.api.js';
import { Client } from './Client.js';
import { GetContractAbi, GetContractCode } from './interfaces/contract.interfaces.js';

/**
 * Contract class handles interactions related to smart contracts, such as fetching contract ABI and bytecode.
 *
 * @class
 */
export class Contract {
  /**
   * Fetches the ABI (Application Binary Interface) of a smart contract.
   *
   * @async
   * @param {string} contractAddress - The smart contract address.
   * @param {string} explorerKey - The API key for the blockchain explorer.
   * @returns {Promise<ApiResponse<GetContractAbi>>} - A promise that resolves to the ABI of the contract.
   * @throws {Error} If the ABI retrieval fails.
   *
   * @example
   * const abi = await Contract.getContractABI('0x...', 'explorerKey');
   * console.log(abi);
   */
  public static async getContractABI(
    contractAddress: string,
    explorerKey: string
  ): Promise<ApiResponse<GetContractAbi>> {
    return await getContractABI(Client.getApiKey(), contractAddress, explorerKey);
  }

  /**
   * Fetches the bytecode of a smart contract.
   *
   * @async
   * @param {string} contractAddress - The smart contract address.
   * @returns {Promise<ApiResponse<GetContractCode>>} - A promise that resolves to the bytecode of the contract.
   * @throws {Error} If the bytecode retrieval fails.
   *
   * @example
   * const bytecode = await Contract.getContractCode('0x...');
   * console.log(bytecode);
   */
  public static async getContractCode(contractAddress: string): Promise<ApiResponse<GetContractCode>> {
    return await getContractCode(Client.getApiKey(), contractAddress);
  }
}
