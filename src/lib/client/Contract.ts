import { ApiResponse } from "../../integrations/api.interfaces.js";
import { getContractABI } from "../../integrations/contract.api.js";
import { Client } from "./Client.js";

/**
 * Contract class handles interactions related to smart contracts, such as fetching the contract's ABI (Application Binary Interface).
 *
 * @class
 */
export class Contract {
  /**
   * Fetches the ABI (Application Binary Interface) of a contract by its address.
   *
   * The ABI is required for interacting with the smart contract, and it contains
   * information about the contract's functions, events, and other properties.
   *
   * @async
   * @param {string} contractAddress - The smart contract address on the blockchain.
   * @returns {Promise<Response>} - A promise that resolves to the ABI of the contract, or an error if the ABI cannot be fetched.
   * @throws {Error} - If the network or contract address is invalid or if the ABI could not be retrieved.
   *
   * @example
   * const abi = await contract.getContractABI('1', '0x..');
   * console.log(abi);
   */
  public static async getContractABI(
    contractAddress: string
  ): Promise<ApiResponse> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getContractABI(chainId, contractAddress, apiKey);
  }
}
