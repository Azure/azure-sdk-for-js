import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions } from "@azure/core-http-compat";
import { AnonymousCredentialPolicy } from "../policies/AnonymousCredentialPolicy.js";
import { Credential } from "./Credential.js";
/**
 * AnonymousCredential provides a credentialPolicyCreator member used to create
 * AnonymousCredentialPolicy objects. AnonymousCredentialPolicy is used with
 * HTTP(S) requests that read public resources or for use with Shared Access
 * Signatures (SAS).
 */
export declare class AnonymousCredential extends Credential {
    /**
     * Creates an {@link AnonymousCredentialPolicy} object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): AnonymousCredentialPolicy;
}
//# sourceMappingURL=AnonymousCredential.d.ts.map