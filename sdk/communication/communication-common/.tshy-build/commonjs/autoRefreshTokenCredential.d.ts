import type { CommunicationGetTokenOptions, TokenCredential } from "./communicationTokenCredential.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { AccessToken } from "@azure/core-auth";
/**
 * Options for auto-refreshing a Communication Token credential.
 */
export interface CommunicationTokenRefreshOptions {
    /**
     * Callback function that returns a string JWT token acquired from the Communication Identity API.
     * The returned token must be valid (expiration date must be in the future).
     */
    tokenRefresher: (abortSignal?: AbortSignalLike) => Promise<string>;
    /**
     * Optional token to initialize.
     */
    token?: string;
    /**
     * Indicates whether the token should be proactively renewed prior to expiry or only renew on demand.
     * By default false.
     */
    refreshProactively?: boolean;
}
export declare class AutoRefreshTokenCredential implements TokenCredential {
    private readonly refresh;
    private readonly refreshProactively;
    private readonly expiringSoonIntervalInMs;
    private readonly refreshAfterLifetimePercentage;
    private currentToken;
    private activeTimeout;
    private activeTokenFetching;
    private activeTokenUpdating;
    private disposed;
    constructor(refreshArgs: CommunicationTokenRefreshOptions);
    getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken>;
    dispose(): void;
    private updateTokenAndReschedule;
    private refreshTokenAndReschedule;
    private refreshToken;
    private scheduleRefresh;
    private isTokenValid;
    private isTokenExpiringSoon;
}
//# sourceMappingURL=autoRefreshTokenCredential.d.ts.map