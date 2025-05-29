import type { TokenCredential } from "@azure/core-auth";
import type { CreateTestCredentialOptions } from "./index.js";
/**
 * Authentication error thrown when the relay server could not authenticate.
 */
export declare class RelayAuthenticationError extends Error {
    cause?: unknown | undefined;
    constructor(message: string, cause?: unknown | undefined);
}
/**
 * Create a credential that can be used in the browser to get tokens from a relay server.
 * This credential should be used in conjunction with the relay server provided by the dev-tool package.
 *
 * @param options options for creating the credential.
 * @returns a credential which will use the relay endpoint to get access tokens.
 */
export declare function createBrowserRelayCredential(options?: CreateTestCredentialOptions): TokenCredential;
//# sourceMappingURL=browserRelayCredential.d.ts.map