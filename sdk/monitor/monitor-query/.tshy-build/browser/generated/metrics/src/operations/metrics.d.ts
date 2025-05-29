import { Metrics } from "../operationsInterfaces/index.js";
import { MonitorManagementClientContext } from "../monitorManagementClientContext.js";
import { MetricsListAtSubscriptionScopeOptionalParams, MetricsListAtSubscriptionScopeResponse, MetricsListAtSubscriptionScopePostOptionalParams, MetricsListAtSubscriptionScopePostResponse, MetricsListOptionalParams, MetricsListResponse } from "../models/index.js";
/** Class containing Metrics operations. */
export declare class MetricsImpl implements Metrics {
    private readonly client;
    /**
     * Initialize a new instance of the class Metrics class.
     * @param client Reference to the service client
     */
    constructor(client: MonitorManagementClientContext);
    /**
     * **Lists the metric data for a subscription**.
     * @param subscriptionId The ID of the target subscription.
     * @param region The region where the metrics you want reside.
     * @param options The options parameters.
     */
    listAtSubscriptionScope(subscriptionId: string, region: string, options?: MetricsListAtSubscriptionScopeOptionalParams): Promise<MetricsListAtSubscriptionScopeResponse>;
    /**
     * **Lists the metric data for a subscription**. Parameters can be specified on either query params or
     * the body.
     * @param subscriptionId The ID of the target subscription.
     * @param region The region where the metrics you want reside.
     * @param options The options parameters.
     */
    listAtSubscriptionScopePost(subscriptionId: string, region: string, options?: MetricsListAtSubscriptionScopePostOptionalParams): Promise<MetricsListAtSubscriptionScopePostResponse>;
    /**
     * **Lists the metric values for a resource**.
     * @param resourceUri The identifier of the resource.
     * @param options The options parameters.
     */
    list(resourceUri: string, options?: MetricsListOptionalParams): Promise<MetricsListResponse>;
}
//# sourceMappingURL=metrics.d.ts.map