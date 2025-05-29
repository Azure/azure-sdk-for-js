import type { PipelinePolicy } from "@azure/core-rest-pipeline";
/**
 * Creates a `PipelinePolicy` that converts relative URL values in the `nextLink` property to absolute URLs.
 *
 * This is necessary because the Core V2 library does not support paging with relative links at time of writing.
 *
 * @param host - The base URL of the resource.
 * @returns the `PipelinePolicy` that addresses the issue.
 */
export declare function createPhoneNumbersPagingPolicy(host: string): PipelinePolicy;
//# sourceMappingURL=customPipelinePolicies.d.ts.map