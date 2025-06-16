import { ApiResponse } from '../../integrations/api.interfaces.js';
import { getAllFarms, getFarmBySymbol, getWhitelistedTokens } from '../../integrations/defi.api.js';
import { Client } from './Client.js';
import { DefiProtocol, Farm, WhitelistedToken } from './interfaces/defi.interfaces.js';

/**
 * Defi class handles operations related to DeFi protocols, including farms and whitelisted tokens.
 *
 * @class
 */
export class Defi {
  /**
   * Fetches whitelisted tokens for a specific DeFi protocol.
   *
   * @async
   * @param {DefiProtocol} protocol - The DeFi protocol to fetch tokens for.
   * @returns {Promise<ApiResponse<WhitelistedToken[]>>} - A promise that resolves to the whitelisted tokens.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const tokens = await Defi.getWhitelistedTokens(DefiProtocol.H2);
   * console.log(tokens);
   */
  public static async getWhitelistedTokens(protocol: DefiProtocol): Promise<ApiResponse<WhitelistedToken[]>> {
    return await getWhitelistedTokens(Client.getApiKey(), protocol);
  }

  /**
   * Fetches all farms for a specific DeFi protocol.
   *
   * @async
   * @param {DefiProtocol} protocol - The DeFi protocol to fetch farms for.
   * @returns {Promise<ApiResponse<Farm[]>>} - A promise that resolves to the farms.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const farms = await Defi.getAllFarms(DefiProtocol.VVS);
   * console.log(farms);
   */
  public static async getAllFarms(protocol: DefiProtocol): Promise<ApiResponse<Farm[]>> {
    return await getAllFarms(Client.getApiKey(), protocol);
  }

  /**
   * Fetches a specific farm by its symbol for a DeFi protocol.
   *
   * @async
   * @param {DefiProtocol} protocol - The DeFi protocol to fetch the farm from.
   * @param {string} symbol - The symbol of the farm to fetch.
   * @returns {Promise<ApiResponse<Farm>>} - A promise that resolves to the farm details.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const farm = await Defi.getFarmBySymbol(DefiProtocol.H2, 'zkCRO-MOON');
   * console.log(farm);
   */
  public static async getFarmBySymbol(protocol: DefiProtocol, symbol: string): Promise<ApiResponse<Farm>> {
    return await getFarmBySymbol(Client.getApiKey(), protocol, symbol);
  }
}
