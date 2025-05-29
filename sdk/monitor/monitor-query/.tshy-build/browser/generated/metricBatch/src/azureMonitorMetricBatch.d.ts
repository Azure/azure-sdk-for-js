import { MetricsBatch } from "./operationsInterfaces/index.js";
import { AzureMonitorMetricBatchContext } from "./azureMonitorMetricBatchContext.js";
import { AzureMonitorMetricBatchOptionalParams, ApiVersion20240201 } from "./models/index.js";
/** @internal */
export declare class AzureMonitorMetricBatch extends AzureMonitorMetricBatchContext {
    /**
     * Initializes a new instance of the AzureMonitorMetricBatch class.
     * @param endpoint The regional endpoint to use, for example https://eastus.metrics.monitor.azure.com.
     *                 The region should match the region of the requested resources. For global resources, the region
     *                 should be 'global'.
     * @param apiVersion Api Version
     * @param options The parameter options
     */
    constructor(endpoint: string, apiVersion: ApiVersion20240201, options?: AzureMonitorMetricBatchOptionalParams);
    metricsBatch: MetricsBatch;
}
//# sourceMappingURL=azureMonitorMetricBatch.d.ts.map