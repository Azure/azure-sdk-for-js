import { type AccessToken, type TokenCredential } from "@azure/core-auth";
import { type TokenCredential as AcsTokenCredential, type CommunicationGetTokenOptions } from "./communicationTokenCredential.js";
export interface ExchangeTokenResponse {
    identity: string;
    accessToken: {
        token: string;
        expiresOn: string;
    };
}
/**
 * The Entra Communication Token Options.
 */
export interface EntraCommunicationTokenCredentialOptions {
    /**
     * The Azure Communication Service resource endpoint URL, e.g. https://myResource.communication.azure.com.
     */
    resourceEndpoint: string;
    /**
     * The Entra ID token credential.
     */
    tokenCredential: TokenCredential;
    /**
     * The scopes for retrieving the Entra ID access token.
     */
    scopes?: string[];
}
/**
 * Represents a credential that exchanges an Entra token for an Azure Communication Services (ACS) token, enabling access to ACS resources.
 */
export declare class EntraTokenCredential implements AcsTokenCredential {
    private options;
    private isPending;
    private result;
    private client;
    private httpClient;
    constructor(options: EntraCommunicationTokenCredentialOptions);
    getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken>;
    private getTokenInternal;
    dispose(): void;
    private exchangeEntraToken;
    private createRequestUri;
    private determineEndpointAndApiVersion;
}
//# sourceMappingURL=entraTokenCredential.d.ts.map