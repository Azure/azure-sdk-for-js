import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions } from "@azure/core-http-compat";
import { CredentialPolicy } from "./CredentialPolicy.js";
/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 */
export declare class AnonymousCredentialPolicy extends CredentialPolicy {
    /**
     * Creates an instance of AnonymousCredentialPolicy.
     * @param nextPolicy -
     * @param options -
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
}
//# sourceMappingURL=AnonymousCredentialPolicy.d.ts.map