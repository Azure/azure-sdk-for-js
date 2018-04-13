import { TokenInfo, TokenProvider } from "./token";
/**
 * @class SasTokenProvider
 * Defines the SasTokenProvider.
 */
export declare class SasTokenProvider implements TokenProvider {
    /**
     * @property {string} namespace - The namespace of the EventHub instance.
     */
    namespace: string;
    /**
     * @property {string} keyName - The name of the EventHub key.
     */
    keyName: string;
    /**
     * @property {string} key - The secret value associated with the above EventHub key
     */
    key: string;
    /**
     * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is good to renew the token. Default = 900 seconds (15 minutes).
     */
    tokenRenewalMarginInSeconds: number;
    /**
     * @property {number} tokenValidTimeInSeconds - The number of seconds for which the token is valid. Default = 3600 seconds (1 hour).
     */
    tokenValidTimeInSeconds: number;
    /**
     * Initializes a new isntance of SasTokenProvider
     * @constructor
     * @param {string} namespace - The namespace of the EventHub instance.
     * @param {string} keyName - The name of the EventHub key.
     * @param {string} key - The secret value associated with the above EventHub key
     */
    constructor(namespace: string, keyName: string, key: string, tokenValidTimeInSeconds?: number, tokenRenewalMarginInSeconds?: number);
    /**
     * Gets the sas token for the specified audience
     * @param {string} [audience] - The audience for which the token is desired. If not
     * provided then the Endpoint from the connection string will be applied.
     */
    getToken(audience?: string): Promise<TokenInfo>;
    /**
     * Creates the sas token based on the provided information
     * @param {string | number} expiry - The time period in unix time after which the token will expire.
     * @param {string} [audience] - The audience for which the token is desired. If not
     * provided then the Endpoint from the connection string will be applied.
     */
    private _createToken(expiry, audience?);
    /**
     *
     * @param {string} connectionString - The EventHub connection string
     */
    static fromConnectionString(connectionString: string): SasTokenProvider;
}
