import { ApiResponse } from '../../integrations/api.interfaces.js';
import { createWallet, getBalance } from '../../integrations/wallet.api.js';
import { Client } from './Client.js';
import { Balance } from './interfaces/token.interfaces.js';
import { WalletData } from './interfaces/wallet.interfaces.js';

/**
 * Wallet class handles operations related to wallet creation and balance retrieval.
 *
 * @class
 */
export class Wallet {
  /**
   * Creates a new wallet using the API.
   *
   * @async
   * @returns {Promise<ApiResponse<CreateWalletData>>} - A promise that resolves to the newly created wallet details.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const newWallet = await Wallet.create();
   * console.log(newWallet);
   */
  public static async create(): Promise<ApiResponse<WalletData>> {
    return await createWallet(Client.getApiKey());
  }

  /**
   * Retrieves the balance of the wallet for a specific address.
   *
   * @async
   * @param {string} walletAddress - The wallet address to fetch the balance for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
   * @returns {Promise<ApiResponse<Balance>>} - A promise that resolves to the balance of the wallet.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const balance = await Wallet.balance('0x...');
   * console.log(balance);
   */
  public static async balance(walletAddress: string): Promise<ApiResponse<Balance>> {
    return await getBalance(Client.getApiKey(), walletAddress);
  }
}
