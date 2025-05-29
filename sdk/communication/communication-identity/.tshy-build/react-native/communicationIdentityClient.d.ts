import type { CommunicationAccessToken, CommunicationIdentityClientOptions, CommunicationUserToken, GetTokenForTeamsUserOptions, CreateUserAndTokenOptions, GetTokenOptions, TokenScope, CreateUserOptions, CommunicationUserDetail } from "./models.js";
import type { CommunicationUserIdentifier } from "@azure/communication-common";
import type { OperationOptions } from "@azure/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
/**
 * Client class for interacting with Azure Communication Services User Token Management.
 */
export declare class CommunicationIdentityClient {
    /**
     * A reference to the auto-generated UserToken HTTP client.
     */
    private readonly client;
    /**
     * Initializes a new instance of the CommunicationIdentity class.
     * @param connectionString - Connection string to connect to an Azure Communication Service resource.
     *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, options?: CommunicationIdentityClientOptions);
    /**
     * Initializes a new instance of the CommunicationIdentity class using an Azure KeyCredential.
     * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
     * @param credential - An object that is used to authenticate requests to the service. Use the AzureKeyCredential or `@azure/identity` to create a credential.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(endpoint: string, credential: KeyCredential, options?: CommunicationIdentityClientOptions);
    /**
     * Initializes a new instance of the CommunicationIdentity class using a TokenCredential.
     * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net)
     * @param credential - TokenCredential that is used to authenticate requests to the service.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(endpoint: string, credential: TokenCredential, options?: CommunicationIdentityClientOptions);
    /**
     * Creates a scoped user token.
     *
     * @param user - The user whose tokens are being issued.
     * @param scopes - Scopes to include in the token.
     * @param options - Additional options for the request.
     */
    getToken(user: CommunicationUserIdentifier, scopes: TokenScope[], options?: GetTokenOptions): Promise<CommunicationAccessToken>;
    /**
     * Revokes all data and tokens created for a user.
     *
     * @param user - The user whose tokens are being revoked.
     * @param options - Additional options for the request.
     */
    revokeTokens(user: CommunicationUserIdentifier, options?: OperationOptions): Promise<void>;
    /**
     * Get an identity by its id.
     *
     * @param user - The user to get.
     * @param options - Additional options for the request.
     */
    getUserDetail(user: CommunicationUserIdentifier, options?: OperationOptions): Promise<CommunicationUserDetail>;
    /**
     * Creates a single user.
     *
     * @param options - Additional options for the request.
     */
    createUser(options?: CreateUserOptions): Promise<CommunicationUserIdentifier>;
    /**
     * Creates a single user and a token simultaneously.
     *
     * @param scopes - Scopes to include in the token.
     * @param options - Additional options for the request.
     */
    createUserAndToken(scopes: TokenScope[], options?: CreateUserAndTokenOptions): Promise<CommunicationUserToken>;
    /**
     * Triggers revocation event for user and deletes all its data.
     *
     * @param user - The user being deleted.
     * @param options - Additional options for the request.
     */
    deleteUser(user: CommunicationUserIdentifier, options?: OperationOptions): Promise<void>;
    /**
     * Exchanges an Azure AD access token of a Teams user for a new Communication Identity access token with a matching expiration time.
     *
     * @param options - Options used to exchange an Azure AD access token of a Teams user for a new Communication Identity access token.
     */
    getTokenForTeamsUser(options: GetTokenForTeamsUserOptions): Promise<CommunicationAccessToken>;
}
//# sourceMappingURL=communicationIdentityClient.d.ts.map