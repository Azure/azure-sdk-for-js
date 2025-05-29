// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { tracingClient } from "./tracing.js";
import { AzureMonitorMetricBatch as GeneratedMonitorMetricClient, KnownApiVersion20240201 as MonitorMetricBatchApiVersion, } from "./generated/metricBatch/src/index.js";
import { convertResponseForMetricBatch, convertRequestForMetricsBatchQuery, } from "./internal/modelConverters.js";
import { SDK_VERSION, KnownMonitorAudience } from "./constants.js";
export const getSubscriptionFromResourceId = function (resourceId) {
    const startPos = resourceId.indexOf("subscriptions/") + 14;
    const subscriptionId = resourceId.substring(startPos, resourceId.indexOf("/", startPos));
    return subscriptionId;
};
/**
 * A client that can query batch metrics.
 */
export class MetricsClient {
    constructor(endpoint, tokenCredential, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options) {
        const scope = (options === null || options === void 0 ? void 0 : options.audience)
            ? `${options.audience}/.default`
            : `${KnownMonitorAudience.AzurePublicCloud}/.default`;
        const packageDetails = `azsdk-js-monitor-query/${SDK_VERSION}`;
        const userAgentPrefix = (options === null || options === void 0 ? void 0 : options.userAgentOptions) && (options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix)
            ? `${options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        const serviceClientOptions = Object.assign(Object.assign({}, options), { $host: endpoint, endpoint: endpoint, credentialScopes: scope, credential: tokenCredential, userAgentOptions: {
                userAgentPrefix,
            } });
        this._baseUrl = endpoint;
        this._metricBatchClient = new GeneratedMonitorMetricClient(this._baseUrl, MonitorMetricBatchApiVersion.TwoThousandTwentyFour0201, serviceClientOptions);
    }
    /**
     * Returns all the Azure Monitor metrics requested for the batch of resources.
     */
    async queryResources(resourceIds, metricNames, metricNamespace, options = {}) {
        if (resourceIds.length === 0) {
            throw new Error("Resource IDs can not be empty");
        }
        return tracingClient.withSpan("MetricsQueryClient.batch", options, async (updatedOptions) => {
            const subscriptionId = getSubscriptionFromResourceId(resourceIds[0]);
            const response = await this._metricBatchClient.metricsBatch.batch(subscriptionId, metricNamespace, metricNames, {
                resourceids: resourceIds,
            }, convertRequestForMetricsBatchQuery(updatedOptions));
            return convertResponseForMetricBatch(response);
        });
    }
}
//# sourceMappingURL=metricsClient.js.map