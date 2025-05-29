import { TokenCredential } from "@azure/core-auth";
import { ClientOptions, Client } from "@azure-rest/core-client";
export interface CodeSigningContext extends Client {
}
/** Optional parameters for the client. */
export interface CodeSigningClientOptionalParams extends ClientOptions {
    /** The API version to use for this operation. */
    apiVersion?: string;
}
/** Code Signing resource provider api. */
export declare function createCodeSigning(credential: TokenCredential, options?: CodeSigningClientOptionalParams): CodeSigningContext;
//# sourceMappingURL=codeSigningContext.d.ts.map