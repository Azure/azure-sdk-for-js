import type { TokenCredential } from "@azure/core-auth";
import type { MetricsQueryResourcesOptions } from "./models/publicBatchModels.js";
import type { MetricsQueryResult } from "./models/publicMetricsModels.js";
import type { MetricsQueryClientOptions } from "./metricsQueryClient.js";
export declare const getSubscriptionFromResourceId: (resourceId: string) => string;
/**
 * A client that can query batch metrics.
 */
export declare class MetricsClient {
    private _metricBatchClient;
    private _baseUrl;
    constructor(endpoint: string, tokenCredential: TokenCredential, options?: MetricsQueryClientOptions);
    /**
     * Returns all the Azure Monitor metrics requested for the batch of resources.
     */
    queryResources(resourceIds: string[], metricNames: string[], metricNamespace: string, options?: MetricsQueryResourcesOptions): Promise<MetricsQueryResult[]>;
}
//# sourceMappingURL=metricsClient.d.ts.map