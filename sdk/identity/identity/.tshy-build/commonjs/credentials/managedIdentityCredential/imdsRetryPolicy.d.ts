import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import type { MSIConfiguration } from "./models.js";
/**
 * An additional policy that retries on 404 errors. The default retry policy does not retry on
 * 404s, but the IMDS endpoint can return 404s when the token is not yet available. This policy
 * will retry on 404s with an exponential backoff.
 *
 * @param msiRetryConfig - The retry configuration for the MSI credential.
 * @returns - The policy that will retry on 404s.
 */
export declare function imdsRetryPolicy(msiRetryConfig: MSIConfiguration["retryConfig"]): PipelinePolicy;
//# sourceMappingURL=imdsRetryPolicy.d.ts.map