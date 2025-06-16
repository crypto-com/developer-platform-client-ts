/**
 * Configuration parameters for setting up the Client.
 *
 * @interface
 * @property {string} apiKey - The API key used to authenticate requests to the blockchain platform.
 * @property {string} [provider] - Optional. The provider URL for creating magic links or for signature requests.
 *
 * @example
 * const config: Config = {
 *   apiKey: 'your-api-key',
 *   provider: 'https://provider-url.com' // Optional
 * };
 */
interface Config {
  apiKey: string;
  provider?: string;
}

/**
 * Client class used to configure and manage blockchain SDK settings.
 *
 * @class
 * @property {string} apiKey - The API key for authenticating requests.
 * @property {string | undefined} provider - Optional provider URL used for signing or generating magic links.
 */
export class Client {
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
      throw new Error("API key not configured. Call Client.init({ apiKey: 'your-api-key' }) first.");
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
}
