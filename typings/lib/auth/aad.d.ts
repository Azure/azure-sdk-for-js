import { ApplicationTokenCredentials, DeviceTokenCredentials, UserTokenCredentials, MSITokenCredentials } from "ms-rest-azure";
import { TokenInfo, TokenProvider } from "./token";
/**
 * Defines the AAD (Azure ActiveDirectory) TokenProvider.
 * @class AadTokenProvider
 */
export declare class AadTokenProvider implements TokenProvider {
    /**
     * @property {(ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials)} credentials - The credentials object after successful authentication with AAD.
     */
    credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials;
    /**
     * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is
     * good to renew the token. A constant set to 270 seconds (4.5 minutes). Adal has a set window of 5 minutes
     * when it refreshes the token from its token cache.
     */
    readonly tokenRenewalMarginInSeconds: number;
    /**
     * @property {number} tokenValidTimeInSeconds - The number of seconds for which the
     * token is valid. A constant set to 3599 seconds (~1 hour). Adal has a set valid time of
     * 1 hour (3600 seconds) when it refreshes the access token.
     */
    readonly tokenValidTimeInSeconds: number;
    constructor(credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials);
    /**
     * Gets the jwt token for the specified audience
     * @param {string} [audience] - The audience for which the token is desired. If not
     * provided then the Endpoint from the connection string will be applied.
     */
    getToken(audience?: string): Promise<TokenInfo>;
}
