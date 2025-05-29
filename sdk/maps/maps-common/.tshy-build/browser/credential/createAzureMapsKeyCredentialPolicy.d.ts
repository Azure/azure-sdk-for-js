import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { KeyCredential } from "@azure/core-auth";
/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Azure Maps
 */
export declare function createAzureMapsKeyCredentialPolicy(azureKeyCredential: KeyCredential): PipelinePolicy;
//# sourceMappingURL=createAzureMapsKeyCredentialPolicy.d.ts.map