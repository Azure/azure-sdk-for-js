import * as coreClient from "@azure/core-client";
import { ApiVersion20240201, AzureMonitorMetricBatchOptionalParams } from "./models/index.js";
/** @internal */
export declare class AzureMonitorMetricBatchContext extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: ApiVersion20240201;
    /**
     * Initializes a new instance of the AzureMonitorMetricBatchContext class.
     * @param endpoint The regional endpoint to use, for example https://eastus.metrics.monitor.azure.com.
     *                 The region should match the region of the requested resources. For global resources, the region
     *                 should be 'global'.
     * @param apiVersion Api Version
     * @param options The parameter options
     */
    constructor(endpoint: string, apiVersion: ApiVersion20240201, options?: AzureMonitorMetricBatchOptionalParams);
}
//# sourceMappingURL=azureMonitorMetricBatchContext.d.ts.map