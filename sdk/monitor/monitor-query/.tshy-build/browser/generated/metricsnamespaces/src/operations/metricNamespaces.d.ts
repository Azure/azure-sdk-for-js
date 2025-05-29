import { MetricNamespaces } from "../operationsInterfaces/index.js";
import { MonitorManagementClientContext } from "../monitorManagementClientContext.js";
import { MetricNamespacesListOptionalParams, MetricNamespacesListResponse } from "../models/index.js";
/** Class containing MetricNamespaces operations. */
export declare class MetricNamespacesImpl implements MetricNamespaces {
    private readonly client;
    /**
     * Initialize a new instance of the class MetricNamespaces class.
     * @param client Reference to the service client
     */
    constructor(client: MonitorManagementClientContext);
    /**
     * Lists the metric namespaces for the resource.
     * @param resourceUri The identifier of the resource.
     * @param options The options parameters.
     */
    list(resourceUri: string, options?: MetricNamespacesListOptionalParams): Promise<MetricNamespacesListResponse>;
}
//# sourceMappingURL=metricNamespaces.d.ts.map