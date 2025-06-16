import { Balance, TokenMetadata } from '../lib/client/interfaces/token.interfaces.js';
import { MagicLinkData } from '../lib/client/interfaces/transaction.interfaces.js';
import { BASE_URL } from '../lib/constants/global.constants.js';
import { ApiResponse, Method } from './api.interfaces.js';

/**
 * Fetches the native token balance of a specific address on a blockchain.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} walletAddress - The wallet address to fetch the native token balance for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
 * @returns {Promise<ApiResponse<Balance>>} - A promise that resolves to the balance of the native token.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getNativeTokenBalance('240', '0x..', 'your-api-key');
 * console.log(balance);
 */
export const getNativeTokenBalance = async (apiKey: string, walletAddress: string): Promise<ApiResponse<Balance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/native-token-balance?walletAddress=${walletAddress}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getNativeTokenBalance] - ${error.message}`);
    throw new Error(`Failed to fetch native token balance: ${error.message}`);
  }
};

/**
 * Fetches the ERC20 token balance of a specific address for a given contract.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} walletAddress - The wallet address to fetch the ERC20 token balance for (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`)
 * @param {string} contractAddress - The contract address of the ERC20 token.
 * @param {string} [blockHeight='latest'] - Optional. The block height to query (default is 'latest').
 * @returns {Promise<ApiResponse<Balance>>} - A promise that resolves to the balance of the ERC20 token.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getERC20TokenBalance('240', '0x...', '0x...', 'latest', 'your-api-key');
 * console.log(balance);
 */
export const getERC20TokenBalance = async (
  apiKey: string,
  walletAddress: string,
  contractAddress: string,
  blockHeight: string = 'latest'
): Promise<ApiResponse<Balance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/erc20-token-balance?walletAddress=${walletAddress}&contractAddress=${contractAddress}&blockHeight=${blockHeight}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getERC20TokenBalance] - ${error.message}`);
    throw new Error(`Failed to fetch ERC20 token balance: ${error.message}`);
  }
};

/**
 * Sends a token transfer transaction to the blockchain.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {object} payload - The transaction payload including 'to' address (CronosIds with the `.cro` suffix are supported, e.g. `XXX.cro`), 'amount', and optional 'contractAddress'.
 * @param {string} [provider] - Optional. The provider URL for the blockchain network.
 * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
 * @throws {Error} Will throw an error if the transaction fails or the server responds with an error message.
 *
 * @example
 * const result = await transferToken('240', { to: '0x...', amount: 1 }, 'https://provider-url.com');
 * console.log(result);
 */
export const transferToken = async (
  apiKey: string,
  payload: {
    to: string;
    amount: number;
    contractAddress?: string; // if not provided, this method initiates a native token transfer.
  },
  provider?: string
): Promise<ApiResponse<MagicLinkData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/transfer`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ ...payload, provider }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[tokenApi/transferToken] - ${error.message}`);
    throw new Error(`Failed to transfer token: ${error.message}`);
  }
};

/**
 * Sends a token wrap transaction to the blockchain.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {object} payload - The transaction payload including 'amount', 'fromContractAddress', and 'toContractAddress'.
 * @param {string} [provider] - Optional. The provider URL for the blockchain network.
 * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
 * @throws {Error} Will throw an error if the transaction fails or the server responds with an error message.
 *
 * @example
 * const result = await wrapToken('1', { amount: 1, fromContractAddress: '0x...', toContractAddress: '0x...' }, 'https://provider-url.com');
 * console.log(result);
 */
export const wrapToken = async (
  apiKey: string,
  payload: {
    amount: number;
  },
  provider?: string
): Promise<ApiResponse<MagicLinkData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/wrap`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ ...payload, provider }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[tokenApi/wrapToken] - ${error.message}`);
    throw new Error(`Failed to wrap token: ${error.message}`);
  }
};

/**
 * Sends a token swap transaction to the blockchain.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {object} payload - The transaction payload including 'amount', 'fromContractAddress', and 'toContractAddress'.
 * @param {string} [provider] - Optional. The provider URL for the blockchain network.
 * @returns {Promise<ApiResponse<MagicLinkData>>} - A promise that resolves to the result of the transaction.
 * @throws {Error} Will throw an error if the transaction fails or the server responds with an error message.
 *
 * @example
 * const result = await swapToken('1', { amount: 1, fromContractAddress: '0x...', toContractAddress: '0x...' }, 'https://provider-url.com');
 * console.log(result);
 */
export const swapToken = async (
  apiKey: string,
  payload: {
    amount: number;
    fromContractAddress: string;
    toContractAddress: string;
  },
  provider?: string
): Promise<ApiResponse<MagicLinkData>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/swap`;

  try {
    const response = await fetch(url, {
      method: Method.POST,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ ...payload, provider }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      const serverErrorMessage = errorBody.error || `HTTP error! status: ${response.status}`;
      throw new Error(serverErrorMessage);
    }

    return await response.json();
  } catch (e) {
    const error = e as Error;
    console.error(`[tokenApi/swapToken] - ${error.message}`);
    throw new Error(`Failed to swap token: ${error.message}`);
  }
};

/**
 * Fetches the ERC721 token balance of a specific address for a given contract.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} walletAddress - The wallet address to fetch the ERC721 token balance for.
 * @param {string} contractAddress - The ERC721 contract address.
 * @returns {Promise<ApiResponse<Balance>>} - A promise that resolves to the balance of the ERC721 tokens.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const balance = await getERC721TokenBalance(apiKey, '0x...', '0x...');
 * console.log(balance);
 */
export const getERC721TokenBalance = async (
  apiKey: string,
  walletAddress: string,
  contractAddress: string
): Promise<ApiResponse<Balance>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/erc721-token-balance?walletAddress=${walletAddress}&contractAddress=${contractAddress}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getERC721TokenBalance] - ${error.message}`);
    throw new Error(`Failed to fetch ERC721 token balance: ${error.message}`);
  }
};

/**
 * Fetches the owner of a specific ERC721 token.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} contractAddress - The ERC721 contract address.
 * @param {string} tokenId - The token ID.
 * @returns {Promise<ApiResponse<string>>} - A promise that resolves to the token owner.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const owner = await getTokenOwner(apiKey, '0x...', '123');
 * console.log(owner);
 */
export const getTokenOwner = async (
  apiKey: string,
  contractAddress: string,
  tokenId: string
): Promise<ApiResponse<string>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/erc721-token-owner?contractAddress=${contractAddress}&tokenId=${tokenId}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getTokenOwner] - ${error.message}`);
    throw new Error(`Failed to fetch token owner: ${error.message}`);
  }
};

/**
 * Fetches the token URI of a specific ERC721 token.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} contractAddress - The ERC721 contract address.
 * @param {string} tokenId - The token ID.
 * @returns {Promise<ApiResponse<string>>} - A promise that resolves to the token URI.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const uri = await getTokenUri(apiKey, '0x...', '123');
 * console.log(uri);
 */
export const getTokenUri = async (
  apiKey: string,
  contractAddress: string,
  tokenId: string
): Promise<ApiResponse<string>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/erc721-token-uri?contractAddress=${contractAddress}&tokenId=${tokenId}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getTokenUri] - ${error.message}`);
    throw new Error(`Failed to fetch token URI: ${error.message}`);
  }
};

/**
 * Fetches metadata for a specific ERC721 token contract.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} contractAddress - The ERC721 contract address.
 * @returns {Promise<ApiResponse<TokenMetadata>>} - A promise that resolves to the metadata.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const metadata = await getERC721Metadata(apiKey, '0x...');
 * console.log(metadata);
 */
export const getERC721Metadata = async (
  apiKey: string,
  contractAddress: string
): Promise<ApiResponse<TokenMetadata>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/erc721-token-metadata?contractAddress=${contractAddress}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getERC721Metadata] - ${error.message}`);
    throw new Error(`Failed to fetch ERC721 metadata: ${error.message}`);
  }
};

/**
 * Fetches metadata for a specific ERC20 token contract.
 *
 * @async
 * @param {string} apiKey - The API key used for authentication with the server.
 * @param {string} contractAddress - The ERC20 contract address.
 * @returns {Promise<ApiResponse<TokenMetadata>>} - A promise that resolves to the metadata.
 * @throws {Error} Will throw an error if the fetch request fails or the server responds with an error message.
 *
 * @example
 * const metadata = await getERC20Metadata(apiKey, '0x...');
 * console.log(metadata);
 */
export const getERC20Metadata = async (
  apiKey: string,
  contractAddress: string
): Promise<ApiResponse<TokenMetadata>> => {
  const url = `${BASE_URL}/api/v1/cdc-developer-platform/token/erc20-token-metadata?contractAddress=${contractAddress}`;

  try {
    const response = await fetch(url, {
      method: Method.GET,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    console.error(`[tokenApi/getERC20Metadata] - ${error.message}`);
    throw new Error(`Failed to fetch ERC20 metadata: ${error.message}`);
  }
};
