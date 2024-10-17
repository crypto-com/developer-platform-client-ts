import { CronosEvm, CronosZkEvm } from './interfaces/chain.interfaces.js';

/**
 * Configuration parameters for setting up the Client.
 *
 * @interface
 * @property {string} apiKey - The API key used to authenticate requests to the blockchain platform.
 * @property {CronosEvm | CronosZkEvm} chain - The blockchain chain to use, specified using enums `CronosEvm` or `CronosZkEvm`.
 * @property {string} [provider] - Optional. The provider URL for creating magic links or for signature requests.
 *
 * @example
 * const config: Config = {
 *   apiKey: 'your-api-key',
 *   chain: CronosZkEvm.Testnet,
 *   provider: 'https://provider-url.com' // Optional
 * };
 */
interface Config {
  chain: CronosEvm | CronosZkEvm;
  apiKey: string;
  provider?: string;
}

/**
 * Client class used to configure and manage blockchain SDK settings.
 *
 * @class
 * @property {string} chainId - The ID of the blockchain chain being used (determined from the chain enum).
 * @property {string} apiKey - The API key for authenticating requests.
 * @property {string | undefined} provider - Optional provider URL used for signing or generating magic links.
 */
export class Client {
  /**
   * @private
   * @type {string}
   * @description The chain ID selected from the enum (`CronosEvm` or `CronosZkEvm`) based on the configured chain.
   * It is set when `Client.configure()` is called, derived from the selected chain.
   */
  private static chainId: string;

  /**
   * @private
   * @type {string}
   * @description The API key used for authenticating requests to the platform.
   * It is set when `Client.configure()` is called.
   */
  private static apiKey: string;

  /**
   * @private
   * @type {string | undefined}
   * @description Optional provider URL that may be used to generate magic links or handle signature requests.
   * It is set during the `Client.configure()` call if provided.
   */
  private static provider: string | undefined;

  /**
   * Configures the SDK with an API key, chain, and optional provider.
   *
   * @param {Config} config - The configuration object for the client.
   * @param {string} config.apiKey - The API key used for authenticating with the platform.
   * @param {CronosEvm | CronosZkEvm} config.chain - The blockchain chain to use, specified from the `CronosEvm` or `CronosZkEvm` enums.
   * @param {string} [config.provider] - Optional provider URL to create magic link or signature URLs.
   * @throws {Error} Throws an error if the chain is not provided in the configuration.
   * @memberof Client
   *
   * @example
   * Client.init({
   *   apiKey: 'your-api-key',
   *   chain: CronosZkEvm.Testnet,
   *   provider: 'https://provider-url.com' // Optional provider
   * });
   */
  public static init(config: Config): void {
    this.chainId = config.chain;
    this.apiKey = config.apiKey;
    this.provider = config.provider;
  }

  /**
   * Retrieves the configured API key.
   *
   * @returns {string} The configured API key.
   * @throws {Error} Throws an error if the API key is not configured.
   * @memberof Client
   *
   * @example
   * const apiKey = Client.getApiKey();
   */
  public static getApiKey(): string {
    if (!this.apiKey) {
      throw new Error("API key not configured. Call Client.configure({ apiKey: 'your-api-key' }) first.");
    }
    return this.apiKey;
  }

  /**
   * Retrieves the configured provider URL, if any.
   *
   * @returns {string | undefined} The provider URL or `undefined` if no provider was configured.
   * @throws {Error} Throws an error if the provider is not a valid url.
   * @memberof Client
   *
   * @example
   * const provider = Client.getProvider();
   */
  public static getProvider(): string | undefined {
    return this.provider;
  }

  /**
   * Retrieves the chain ID based on the selected chain enum.
   *
   * @returns {string} The chain ID corresponding to the configured chain.
   * @throws {Error} Throws an error if the chain ID is not configured.
   * @memberof Client
   *
   * @example
   * const chainId = Client.getChainId();
   */
  public static getChainId(): string {
    if (!this.chainId) {
      throw new Error('Chain ID not configured. Call Client.configure({ chain: CronosZkEvm.Testnet }) first.');
    }
    return this.chainId;
  }
}
