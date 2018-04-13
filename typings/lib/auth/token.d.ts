/**
 * Describes the type of supported tokens.
 * @readonly
 * @enum TokenType
 */
export declare enum TokenType {
    /**
     * The "jwt" token type. Used with AADTokenProvider.
     */
    CbsTokenTypeJwt = "jwt",
    /**
     * The sas token type. Used with SasTokenProvider.
     */
    CbsTokenTypeSas = "servicebus.windows.net:sastoken",
}
/**
 * Provides information about the token.
 * @interface TokenInfo
 */
export interface TokenInfo {
    /**
     * @property {string} tokenType - The type of token - "jwt" or "servicebus.windows.net:sastoken".
     */
    tokenType: TokenType;
    /**
     * @property {string} token - The access token.
     */
    token: string;
    expiry: number;
}
/**
 * Describes the base token provider.
 * @interface TokenProvider
 */
export interface TokenProvider {
    /**
     * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is good to renew the token. Default = 900 seconds (15 minutes).
     */
    tokenRenewalMarginInSeconds: number;
    /**
     * @property {number} tokenValidTimeInSeconds - The number of seconds for which the token is valid. Default = 3600 seconds (1 hour).
     */
    tokenValidTimeInSeconds: number;
    /**
     * Gets the token for the desired audience.
     * @param {string} [audience] - The audience for which the token is desired.
     * @returns {Promise<TokenInfo>}
     */
    getToken(audience?: string): Promise<TokenInfo>;
}
