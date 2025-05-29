import type { AbortSignalLike } from "@azure/abort-controller";
import type { AccessToken } from "@azure/core-auth";
export type TokenCredential = Pick<CommunicationTokenCredential, "getToken" | "dispose">;
/**
 * Options for `CommunicationTokenCredential`'s `getToken` function.
 */
export interface CommunicationGetTokenOptions {
    /**
     * An implementation of `AbortSignalLike` to cancel the operation.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * The Azure Communication Services token credential.
 */
export interface CommunicationTokenCredential {
    /**
     * Gets an `AccessToken` for the user. Throws if already disposed.
     * @param options - Additional options.
     */
    getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken>;
    /**
     * Disposes the CommunicationTokenCredential and cancels any internal auto-refresh operation.
     */
    dispose(): void;
}
//# sourceMappingURL=communicationTokenCredential.d.ts.map