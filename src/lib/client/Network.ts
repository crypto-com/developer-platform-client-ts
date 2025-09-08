import { getChainId, getClientVersion, getNetworkInfo } from '../../integrations/network.api.js';
import { ApiResponse } from '../../integrations/api.interfaces.js';
import { Client } from './Client.js';
import { ChainId, ClientVersion, Info } from './interfaces/network.interface.js';

/**
 * Network class handles operations related to network data retrieval.
 *
 * @class
 */
export class Network {
  /**
   * Retrieves accessing blockchain network metadata.
   *
   * @async
   *
   * @returns {Promise<ApiResponse<Info>>} - A promise that return network metadata.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const info = await Network.info();
   * console.log(info);
   */
  public static async info(): Promise<ApiResponse<Info>> {
    return await getNetworkInfo(Client.getApiKey());
  }

  /**
   * Retrieves the current chain ID.
   *
   * @async
   *
   * @returns {Promise<ApiResponse<ChainId>>} - A promise that return Chain ID value.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const chainId = await Network.chainId();
   * console.log(chainId);
   */
  public static async chainId(): Promise<ApiResponse<ChainId>> {
    return await getChainId(Client.getApiKey());
  }

  /**
   * Retrieves the connected node's client version.
   *
   * @async
   *
   * @returns {Promise<ApiResponse<ClientVersion>>} - A promise that return Client version string.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const clientVersion = await Network.clientVersion();
   * console.log(clientVersion);
   */
  public static async clientVersion(): Promise<ApiResponse<ClientVersion>> {
    return await getClientVersion(Client.getApiKey());
  }
}
