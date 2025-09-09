import { ApiResponse } from '../../integrations/api.interfaces.js';
import { Log } from './interfaces/log.interfaces.js';
import { getLogs } from '../../integrations/event.api.js';
import { Client } from './Client.js';

/**
 * Event class for fetching event logs.
 *
 * @class
 */
export class Event {
  /**
   * Retrieves the emitted events of a smart contract.
   *
   * @async
   * @param {string} address - The wallet address to resolve.
   * @returns {Promise<ApiResponse<Log[]>>} - A promise that return a list of decoded contract events.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const log = await Event.getLogs();
   * console.log(log);
   */
  public static async getLogs(address: string): Promise<ApiResponse<Log[]>> {
    return await getLogs(Client.getApiKey(), address);
  }
}
