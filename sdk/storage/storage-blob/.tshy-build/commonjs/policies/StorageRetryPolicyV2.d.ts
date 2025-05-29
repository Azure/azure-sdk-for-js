import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { type StorageRetryOptions } from "../StorageRetryPolicyFactory.js";
/**
 * Name of the {@link storageRetryPolicy}
 */
export declare const storageRetryPolicyName = "storageRetryPolicy";
/**
 * Retry policy with exponential retry and linear retry implemented.
 */
export declare function storageRetryPolicy(options?: StorageRetryOptions): PipelinePolicy;
//# sourceMappingURL=StorageRetryPolicyV2.d.ts.map