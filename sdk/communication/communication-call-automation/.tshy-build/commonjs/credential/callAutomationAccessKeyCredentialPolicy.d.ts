import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { KeyCredential } from "@azure/core-auth";
/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 * @hidden
 *
 * @param credential - The key credential.
 */
export declare function createCallAutomationAccessKeyCredentialPolicy(credential: KeyCredential, acsUrl: string): PipelinePolicy;
//# sourceMappingURL=callAutomationAccessKeyCredentialPolicy.d.ts.map