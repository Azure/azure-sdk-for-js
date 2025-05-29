import type { RequestPolicy, RequestPolicyFactory, RequestPolicyOptionsLike as RequestPolicyOptions } from "@azure/core-http-compat";
import type { CredentialPolicy } from "../policies/CredentialPolicy.js";
/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 */
export declare abstract class Credential implements RequestPolicyFactory {
    /**
     * Creates a RequestPolicy object.
     *
     * @param _nextPolicy -
     * @param _options -
     */
    create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy;
}
/**
 * A factory function that creates a new CredentialPolicy that uses the provided nextPolicy.
 */
export type CredentialPolicyCreator = (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => CredentialPolicy;
//# sourceMappingURL=Credential.d.ts.map