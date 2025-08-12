import { ApiResponse } from '../../integrations/api.interfaces.js';
import { getContractCode } from '../../integrations/contract.api.js';
import { Client } from './Client.js';
import { ContractCode } from './interfaces/contract.interfaces.js';

/**
 * Contract class handles interactions related to smart contracts, such as fetching contract ABI and bytecode.
 *
 * @class
 */
export class Contract {
  /**
   * Fetches the bytecode of a smart contract.
   *
   * @async
   * @param {string} contractAddress - The smart contract address.
   * @returns {Promise<ApiResponse<ContractCode>>} - A promise that resolves to the bytecode of the contract.
   * @throws {Error} If the bytecode retrieval fails.
   *
   * @example
   * const bytecode = await Contract.getContractCode('0x...');
   * console.log(bytecode);
   */
  public static async getContractCode(contractAddress: string): Promise<ApiResponse<ContractCode>> {
    return await getContractCode(Client.getApiKey(), contractAddress);
  }
}
