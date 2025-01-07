import { ApiResponse } from '../../integrations/api.interfaces.js';
import { lookupAddress, resolveName } from '../../integrations/cronosid.api.js';
import { ChainName } from '../utils/chain.utils.js';
import { Client } from './Client.js';
import { LookupAddressResponse, ResolveNameResponse } from './interfaces/cronosid.interfaces.js';

export class CronosId {
  /**
   * The registry contracts for CronosId on different chains - CronosId is supported on EVM and EVM Testnet only
   */
  private static readonly supportedChains = [ChainName.CRONOS_EVM, ChainName.CRONOS_EVM_TESTNET];

  /**
   * Checks if a given string is a valid CronosId, which is a string ending with '.cro' and not empty.
   * example: 'alice.cro' is a valid CronosId, but 'alice' is not.
   *
   * @param {string} name - The string to check for CronosId validity.
   * @returns {boolean} - True if the string is a valid CronosId, false otherwise.
   */
  public static isCronosId(name: string): boolean {
    const lowercaseName = name.toLowerCase();
    const parts = lowercaseName.split('.cro');
    return lowercaseName.endsWith('.cro') && parts[0].length > 0;
  }

  /**
   * Checks if CronosId is supported on the current chain specified in the client.
   *
   * @returns {boolean} - True if CronosId is supported on the current chain, false otherwise.
   */
  public static isSupported(): boolean {
    const chainId = Client.getChainId();
    return this.supportedChains.includes(chainId as ChainName);
  }

  /**
   * Resolves a CronosId to a wallet address
   *
   * @param {string} cronosId - The CronosId to resolve.
   * @returns {Promise<string>} - A promise that resolves to the resolved address.
   * @throws {Error} - Throws an error if the CronosId is not valid or if the resolution fails.
   */
  public static async forwardResolve(cronosId: string): Promise<ApiResponse<ResolveNameResponse>> {
    if (!this.isSupported()) {
      throw new Error('CronosId is not supported on the current chain');
    }
    if (!this.isCronosId(cronosId)) {
      throw new Error(`Invalid CronosId format: ${cronosId}`);
    }
    return await resolveName(cronosId);
  }

  /**
   * Resolves a wallet address to a CronosId if it has one
   *
   * @param {string} address - The wallet address to resolve.
   * @returns {Promise<string>} - A promise that resolves to the resolved CronosId.
   * @throws {Error} - Throws an error if the address is not valid or if the resolution fails.
   */
  public static async reverseResolve(address: string): Promise<ApiResponse<LookupAddressResponse>> {
    if (!this.isSupported()) {
      throw new Error('CronosId is not supported on the current chain');
    }

    return await lookupAddress(address);
  }
}
