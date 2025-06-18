import { ApiResponse } from '../../integrations/api.interfaces.js';
import {
  getERC20TokenBalance,
  getNativeTokenBalance,
  swapToken,
  transferToken,
  wrapToken,
  getERC721TokenBalance,
  getTokenOwner,
  getTokenUri,
  getERC721Metadata,
  getERC20Metadata,
} from '../../integrations/token.api.js';
import { Client } from './Client.js';
import { Balance, TokenMetadata } from './interfaces/token.interfaces.js';
import { MagicLinkData } from './interfaces/transaction.interfaces.js';

/**
 * Token class handles operations related to native tokens, ERC20 tokens, and NFTs.
 *
 * @class
 */
export class Token {
  /**
   * Fetches the native token balance of a specific wallet address.
   *
   * @async
   * @param {string} address - The wallet address (or CronosId `.cro`) to check.
   * @returns {Promise<ApiResponse<Balance>>} The native token balance.
   * @throws {Error} If the request fails.
   *
   * @example
   * const balance = await Token.getNativeTokenBalance('0x123...');
   * console.log(balance);
   */
  public static async getNativeTokenBalance(address: string): Promise<ApiResponse<Balance>> {
    return await getNativeTokenBalance(Client.getApiKey(), address);
  }

  /**
   * Fetches the ERC20 token balance of a wallet for a given ERC20 contract.
   *
   * @async
   * @param {string} address - The wallet address (or CronosId `.cro`) to check.
   * @param {string} contractAddress - The ERC20 contract address.
   * @param {string} [blockHeight='latest'] - Optional block height (default 'latest').
   * @returns {Promise<ApiResponse<TokenBalance>>} The ERC20 token balance.
   * @throws {Error} If the request fails.
   *
   * @example
   * const balance = await Token.getERC20TokenBalance('0x123...', '0xContract...');
   * console.log(balance);
   */
  public static async getERC20TokenBalance(
    address: string,
    contractAddress: string,
    blockHeight: string = 'latest'
  ): Promise<ApiResponse<Balance>> {
    return await getERC20TokenBalance(Client.getApiKey(), address, contractAddress, blockHeight);
  }

  /**
   * Transfers native or ERC20 tokens.
   *
   * @async
   * @param {object} payload - Transfer parameters.
   * @param {string} payload.to - Recipient address.
   * @param {number} payload.amount - Amount to transfer.
   * @param {string} [payload.contractAddress] - ERC20 contract address (optional).
   * @returns {Promise<ApiResponse<MagicLinkData>>} Transaction result.
   * @throws {Error} If the request fails.
   *
   * @example
   * const result = await Token.transfer({ to: '0x456...', amount: 10 });
   * console.log(result);
   */
  public static async transfer(payload: {
    to: string;
    amount: number;
    contractAddress?: string;
  }): Promise<ApiResponse<MagicLinkData>> {
    return await transferToken(Client.getApiKey(), payload, Client.getProvider());
  }

  /**
   * Wrap tokens.
   *
   * @async
   * @param {object} payload - Wrap parameters.
   * @param {number} payload.amount - Amount to wrap.
   * @returns {Promise<ApiResponse<MagicLinkData>>} Wrap transaction result.
   * @throws {Error} If the request fails.
   *
   * @example
   * const result = await Token.wrap({ amount: 5 });
   * console.log(result);
   */
  public static async wrap(payload: { amount: number }): Promise<ApiResponse<MagicLinkData>> {
    return await wrapToken(Client.getApiKey(), payload, Client.getProvider());
  }

  /**
   * Swap tokens.
   *
   * @async
   * @param {object} payload - Swap parameters.
   * @param {string} payload.fromContractAddress - Token being swapped.
   * @param {string} payload.toContractAddress - Token to receive.
   * @param {number} payload.amount - Amount to swap.
   * @returns {Promise<ApiResponse<MagicLinkData>>} Swap transaction result.
   * @throws {Error} If the request fails.
   *
   * @example
   * const result = await Token.swap({
   *   fromContractAddress: '0xFrom...',
   *   toContractAddress: '0xTo...',
   *   amount: 1
   * });
   * console.log(result);
   */
  public static async swap(payload: {
    fromContractAddress: string;
    toContractAddress: string;
    amount: number;
  }): Promise<ApiResponse<MagicLinkData>> {
    return await swapToken(Client.getApiKey(), payload, Client.getProvider());
  }

  /**
   * Fetches the ERC721 token balance for a wallet and contract.
   *
   * @async
   * @param {string} walletAddress - Wallet address to check.
   * @param {string} contractAddress - ERC721 contract address.
   * @returns {Promise<ApiResponse<Balance>>} The ERC721 token balance.
   * @throws {Error} If the request fails.
   *
   * @example
   * const balance = await Token.getERC721TokenBalance('0x123...', '0xContract...');
   * console.log(balance);
   */
  public static async getERC721TokenBalance(
    walletAddress: string,
    contractAddress: string
  ): Promise<ApiResponse<Balance>> {
    return await getERC721TokenBalance(Client.getApiKey(), walletAddress, contractAddress);
  }

  /**
   * Fetches the owner of a specific ERC721 token.
   *
   * @async
   * @param {string} contractAddress - ERC721 contract address.
   * @param {string} tokenId - Token ID.
   * @returns {Promise<ApiResponse<string>>} Token owner information.
   * @throws {Error} If the request fails.
   *
   * @example
   * const owner = await Token.getTokenOwner('0xContract...', '123');
   * console.log(owner);
   */
  public static async getTokenOwner(contractAddress: string, tokenId: string): Promise<ApiResponse<string>> {
    return await getTokenOwner(Client.getApiKey(), contractAddress, tokenId);
  }

  /**
   * Fetches the token URI of a specific ERC721 token.
   *
   * @async
   * @param {string} contractAddress - ERC721 contract address.
   * @param {string} tokenId - Token ID.
   * @returns {Promise<ApiResponse<string>>} Token URI information.
   * @throws {Error} If the request fails.
   *
   * @example
   * const uri = await Token.getTokenURI('0xContract...', '123');
   * console.log(uri);
   */
  public static async getTokenURI(contractAddress: string, tokenId: string): Promise<ApiResponse<string>> {
    return await getTokenUri(Client.getApiKey(), contractAddress, tokenId);
  }

  /**
   * Fetches metadata for a specific ERC721 contract.
   *
   * @async
   * @param {string} contractAddress - ERC721 contract address.
   * @returns {Promise<ApiResponse<TokenMetadata>>} ERC721 contract metadata.
   * @throws {Error} If the request fails.
   *
   * @example
   * const metadata = await Token.getERC721Metadata('0xContract...');
   * console.log(metadata);
   */
  public static async getERC721Metadata(contractAddress: string): Promise<ApiResponse<TokenMetadata>> {
    return await getERC721Metadata(Client.getApiKey(), contractAddress);
  }

  /**
   * Fetches metadata for a specific ERC20 contract.
   *
   * @async
   * @param {string} contractAddress - ERC20 contract address.
   * @returns {Promise<ApiResponse<TokenMetadata>>} ERC20 contract metadata.
   * @throws {Error} If the request fails.
   *
   * @example
   * const metadata = await Token.getERC20Metadata('0xContract...');
   * console.log(metadata);
   */
  public static async getERC20Metadata(contractAddress: string): Promise<ApiResponse<TokenMetadata>> {
    return await getERC20Metadata(Client.getApiKey(), contractAddress);
  }
}
