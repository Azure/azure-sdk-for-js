import { type PipelinePolicy } from "@azure/core-rest-pipeline";
import { type KeyCredential, type TokenCredential } from "@azure/core-auth";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export declare function createCommunicationAuthPolicy(credential: KeyCredential | TokenCredential): PipelinePolicy;
//# sourceMappingURL=communicationAuthPolicy.d.ts.map