import { ApiResponse } from '../../integrations/api.interfaces.js';
import {
  getERC20TokenBalance,
  getNativeTokenBalance,
  swapToken,
  transferToken,
  wrapToken,
} from '../../integrations/token.api.js';
import { Client } from './Client.js';
import { TokenBalance } from './interfaces/explorer.interfaces.js';
import { Balance } from './interfaces/token.interfaces.js';
import { MagicLinkData } from './interfaces/transaction.interfaces.js';

/**
 * Token class handles operations related to native tokens and ERC20 tokens,
 * such as fetching balances, transferring tokens, and token wrapping/swapping.
 *
 * @class
 */
export class Token {
  /**
   * Fetches the native token balance of a specific wallet address.
   *
   * @async
   * @param {string} address - The wallet address to check the native token balance for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
   * @returns {Promise<ApiResponse<Balance>>} - A promise that resolves to the balance of the native token.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const balance = await Token.getNativeTokenBalance('0x...');
   * console.log(balance);
   */
  public static async getNativeTokenBalance(address: string): Promise<ApiResponse<Balance>> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getNativeTokenBalance(chainId, address, apiKey);
  }

  /**
   * Fetches the ERC20 token balance of a specific wallet address for a given ERC20 contract.
   *
   * @async
   * @param {string} address - The wallet address to check the ERC20 token balance for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
   * @param {string} contractAddress - The contract address of the ERC20 token.
   * @param {string} [blockHeight='latest'] - Optional. The block height to query, default is 'latest'.
   * @returns {Promise<ApiResponse<TokenBalance>>} - A promise that resolves to the balance of the ERC20 token.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const erc20Balance = await Token.getERC20TokenBalance('0x...', '0x...');
   * console.log(erc20Balance);
   */
  public static async getERC20TokenBalance(
    address: string,
    contractAddress: string,
    blockHeight: string = 'latest'
  ): Promise<ApiResponse<TokenBalance>> {
    const chainId = Client.getChainId();
    const apiKey = Client.getApiKey();
    return await getERC20TokenBalance(chainId, address, contractAddress, blockHeight, apiKey);
  }

  /**
   * Sends a token transfer request to the blockchain network.
   *
   * @async
   * @param {object} payload - The transaction payload containing `to`, `amount`, and optionally `contractAddress`.
   * @param {string} payload.to - The recipient address of the transfer (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
   * @param {number} payload.amount - The amount of tokens to transfer.
   * @param {string} [payload.contractAddress] - Optional. The contract address of the ERC20 token (if transferring ERC20 tokens).
   * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const transferResult = await Token.transferToken({ to: '0x...', amount: 1 });
   * console.log(transferResult);
   */
  public static async transfer(payload: {
    to: string;
    amount: number;
    contractAddress?: string;
  }): Promise<ApiResponse<MagicLinkData>> {
    const chainId = Client.getChainId();
    const provider = Client.getProvider();
    return await transferToken(chainId, payload, provider);
  }

  /**
   * Sends a token wrap request to the blockchain network, wrapping one token into another.
   *
   * @async
   * @param {object} payload - The transaction payload containing `fromContractAddress`, `toContractAddress`, and `amount`.
   * @param {number} payload.amount - The amount of tokens to wrap.
   * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the wrap transaction.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const wrapResult = await Token.wrapToken({ fromContractAddress: '0x123...', toContractAddress: '0x456...', amount: 1 });
   * console.log(wrapResult);
   */
  public static async wrap(payload: { amount: number }): Promise<ApiResponse<MagicLinkData>> {
    const chainId = Client.getChainId();
    const provider = Client.getProvider();
    return await wrapToken(chainId, payload, provider);
  }

  /**
   * Sends a token swap request to the blockchain network, swapping one token for another.
   *
   * @async
   * @param {object} payload - The transaction payload containing `fromContractAddress`, `toContractAddress`, and `amount`.
   * @param {string} payload.fromContractAddress - The contract address of the token being swapped.
   * @param {string} payload.toContractAddress - The contract address of the token to receive.
   * @param {number} payload.amount - The amount of tokens to swap.
   * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the swap transaction.
   * @throws {Error} - Throws an error if the request fails.
   *
   * @example
   * const swapResult = await Token.swapToken({ fromContractAddress: '0x...', toContractAddress: '0x...', amount: 1 });
   * console.log(swapResult);
   */
  public static async swap(payload: {
    fromContractAddress: string;
    toContractAddress: string;
    amount: number;
  }): Promise<ApiResponse<MagicLinkData>> {
    const chainId = Client.getChainId();
    const provider = Client.getProvider();
    return await swapToken(chainId, payload, provider);
  }
}
