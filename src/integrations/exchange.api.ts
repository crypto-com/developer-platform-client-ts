import { TickerData } from '../lib/client/interfaces/exchange.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches all tickers from the exchange.
 *
 * @async
 * @returns {Promise<ApiResponse<TickerResponse>>} - All available tickers.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const tickers = await getAllTickers();
 * console.log(tickers);
 */
export const getAllTickers = async (): Promise<ApiResponse<TickerData[]>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/exchange/tickers`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
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
    console.error(`[exchangeApi/getAllTickers] - ${error.message}`);
    throw new Error(`Failed to fetch tickers: ${error.message}`);
  }
};

/**
 * Fetches ticker information for a specific instrument.
 *
 * @async
 * @param {string} instrumentName - The name of the trading instrument (e.g., 'BTC_USDT').
 * @returns {Promise<ApiResponse<Ticker>>} - The ticker information for the specified instrument.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const btcTicker = await getTickerByInstrument('BTC_USDT');
 * console.log(btcTicker);
 */
export const getTickerByInstrument = async (instrumentName: string): Promise<ApiResponse<TickerData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/exchange/tickers/${instrumentName}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
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
    console.error(`[exchangeApi/getTickerByInstrument] - ${error.message}`);
    throw new Error(`Failed to fetch ticker for ${instrumentName}: ${error.message}`);
  }
};
