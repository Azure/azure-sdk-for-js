import { type CommunicationTokenRefreshOptions } from "./autoRefreshTokenCredential.js";
import type { CommunicationGetTokenOptions, CommunicationTokenCredential } from "./communicationTokenCredential.js";
import type { AccessToken } from "@azure/core-auth";
import { type EntraCommunicationTokenCredentialOptions } from "./entraTokenCredential.js";
/**
 * The CommunicationTokenCredential implementation with support for proactive token refresh.
 */
export declare class AzureCommunicationTokenCredential implements CommunicationTokenCredential {
    private readonly tokenCredential;
    private disposed;
    /**
     * Creates an instance of CommunicationTokenCredential with a static token and no proactive refreshing.
     * @param token - A user access token issued by Communication Services.
     */
    constructor(token: string);
    /**
     * Creates an instance of CommunicationTokenCredential with a lambda to get a token and options
     * to configure proactive refreshing.
     * @param refreshOptions - Options to configure refresh and opt-in to proactive refreshing.
     */
    constructor(refreshOptions: CommunicationTokenRefreshOptions);
    /**
     * Creates an instance of CommunicationTokenCredential with an Entra ID token credential. In most cases, you might want to use InteractiveBrowserCredential to sign in your user.
     * @param entraOptions - Options to configure the Entra ID token credential.
     */
    constructor(entraOptions: EntraCommunicationTokenCredentialOptions);
    /**
     * Gets an `AccessToken` for the user. Throws if already disposed.
     * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
     */
    getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken>;
    /**
     * Disposes the CommunicationTokenCredential and cancels any internal auto-refresh operation.
     */
    dispose(): void;
    private throwIfDisposed;
}
//# sourceMappingURL=azureCommunicationTokenCredential.d.ts.map