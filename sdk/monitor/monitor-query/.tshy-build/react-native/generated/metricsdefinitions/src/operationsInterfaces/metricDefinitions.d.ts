import { MetricDefinitionsListAtSubscriptionScopeOptionalParams, MetricDefinitionsListAtSubscriptionScopeResponse, MetricDefinitionsListOptionalParams, MetricDefinitionsListResponse } from "../models/index.js";
/** Interface representing a MetricDefinitions. */
export interface MetricDefinitions {
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