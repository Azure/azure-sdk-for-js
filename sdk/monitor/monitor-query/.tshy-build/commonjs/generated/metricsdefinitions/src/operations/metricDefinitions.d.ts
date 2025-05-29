import { MetricDefinitions } from "../operationsInterfaces/index.js";
import { MonitorManagementClientContext } from "../monitorManagementClientContext.js";
import { MetricDefinitionsListAtSubscriptionScopeOptionalParams, MetricDefinitionsListAtSubscriptionScopeResponse, MetricDefinitionsListOptionalParams, MetricDefinitionsListResponse } from "../models/index.js";
/** Class containing MetricDefinitions operations. */
export declare class MetricDefinitionsImpl implements MetricDefinitions {
    private readonly client;
    /**
     * Initialize a new instance of the class MetricDefinitions class.
     * @param client Reference to the service client
     */
    constructor(client: MonitorManagementClientContext);
    /**
     * Lists the metric definitions for the subscription.
     * @param subscriptionId The ID of the target subscription.
     * @param region The region where the metrics you want reside.
     * @param options The options parameters.
     */
    listAtSubscriptionScope(subscriptionId: string, region: string, options?: MetricDefinitionsListAtSubscriptionScopeOptionalParams): Promise<MetricDefinitionsListAtSubscriptionScopeResponse>;
    /**
     * Lists the metric definitions for the resource.
     * @param resourceUri The identifier of the resource.
     * @param options The options parameters.
     */
    list(resourceUri: string, options?: MetricDefinitionsListOptionalParams): Promise<MetricDefinitionsListResponse>;
}
//# sourceMappingURL=metricDefinitions.d.ts.map