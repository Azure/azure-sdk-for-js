import type { PipelinePolicy } from "@azure/core-rest-pipeline";
/**
 * Create an HTTP pipeline policy to add x-ms-client-id header
 * for `TokenCredential` based authentication for Azure Maps
 */
export declare function createMapsClientIdPolicy(mapsClientId: string): PipelinePolicy;
//# sourceMappingURL=createMapsClientIdPolicy.d.ts.map