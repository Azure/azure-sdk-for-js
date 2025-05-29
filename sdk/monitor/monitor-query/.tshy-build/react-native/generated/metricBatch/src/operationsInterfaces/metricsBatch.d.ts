import { ResourceIdList, MetricsBatchBatchOptionalParams, MetricsBatchBatchResponse } from "../models/index.js";
/** Interface representing a MetricsBatch. */
export interface MetricsBatch {
    /**
     * Lists the metric values for multiple resources.
     * @param subscriptionId The subscription identifier for the resources in this batch.
     * @param metricnamespace Metric namespace that contains the requested metric names.
     * @param metricnames The names of the metrics (comma separated) to retrieve.
     * @param batchRequest Metrics batch body including the list of resource ids
     * @param options The options parameters.
     */
    batch(subscriptionId: string, metricnamespace: string, metricnames: string[], batchRequest: ResourceIdList, options?: MetricsBatchBatchOptionalParams): Promise<MetricsBatchBatchResponse>;
}
//# sourceMappingURL=metricsBatch.d.ts.map