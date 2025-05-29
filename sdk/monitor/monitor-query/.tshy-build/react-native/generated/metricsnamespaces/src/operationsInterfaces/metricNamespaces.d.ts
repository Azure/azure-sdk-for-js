import { MetricNamespacesListOptionalParams, MetricNamespacesListResponse } from "../models/index.js";
/** Interface representing a MetricNamespaces. */
export interface MetricNamespaces {
    /**
     * Lists the metric namespaces for the resource.
     * @param resourceUri The identifier of the resource.
     * @param options The options parameters.
     */
    list(resourceUri: string, options?: MetricNamespacesListOptionalParams): Promise<MetricNamespacesListResponse>;
}
//# sourceMappingURL=metricNamespaces.d.ts.map