import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { CallAutomationApiClientOptionalParams } from "./../generated/src/index.js";
import { CallAutomationApiClient } from "./../generated/src/index.js";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export declare function createCallAutomationAuthPolicy(credential: KeyCredential | TokenCredential, acsUrl: string): PipelinePolicy;
/**
 * Creates CallAutomationApiClient for custom endpoint
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 * @param internalPipelineOptions - CallAutomationApiClientOptionalParams if provided.
 * @param url - ACS url.
 */
export declare function createCustomCallAutomationApiClient(credential: KeyCredential | TokenCredential, internalPipelineOptions: CallAutomationApiClientOptionalParams | undefined, url: string): CallAutomationApiClient;
//# sourceMappingURL=callAutomationAuthPolicy.d.ts.map