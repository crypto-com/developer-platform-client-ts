import { ApiResponse } from '../../integrations/api.interfaces.js';
import { getAllTickers, getTickerByInstrument } from '../../integrations/exchange.api.js';
import { Client } from './Client.js';
import { TickerData } from './interfaces/exchange.interfaces.js';

/**
 * Exchange class handles operations related to exchange data retrieval.
 *
 * @class
 */
export class Exchange {
  /**
   * Retrieves all available tickers from the Crypto.com Exchange (Chain agnostic).
   *
   * @async
   * @function getFarmBySymbol
   * @returns {Promise<ApiResponse<TickerResponse>>} - A promise that resolves to all available tickers.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const tickers = await Exchange.getAllTickers();
   * console.log(tickers);
   */
  public static async getAllTickers(): Promise<ApiResponse<TickerData[]>> {
    return await getAllTickers(Client.getApiKey());
  }

  /**
   * Retrieves ticker information for a specific trading instrument from the Crypto.com Exchange (Chain agnostic).
   *
   * @async
   *
   * @param {string} instrumentName - The name of the trading instrument (e.g., 'BTC_USDT')
   * @returns {Promise<ApiResponse<TickerData>>} - A promise that resolves to the ticker information.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const btcTicker = await Exchange.getTickerByInstrument('BTC_USDT');
   * console.log(btcTicker);
   */
  public static async getTickerByInstrument(instrumentName: string): Promise<ApiResponse<TickerData>> {
    return await getTickerByInstrument(Client.getApiKey(), instrumentName);
  }
}
