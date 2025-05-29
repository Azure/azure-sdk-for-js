"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsClient = exports.getSubscriptionFromResourceId = void 0;
const tracing_js_1 = require("./tracing.js");
const index_js_1 = require("./generated/metricBatch/src/index.js");
const modelConverters_js_1 = require("./internal/modelConverters.js");
const constants_js_1 = require("./constants.js");
const getSubscriptionFromResourceId = function (resourceId) {
    const startPos = resourceId.indexOf("subscriptions/") + 14;
    const subscriptionId = resourceId.substring(startPos, resourceId.indexOf("/", startPos));
    return subscriptionId;
};
exports.getSubscriptionFromResourceId = getSubscriptionFromResourceId;
/**
 * A client that can query batch metrics.
 */
class MetricsClient {
    constructor(endpoint, tokenCredential, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options) {
        const scope = (options === null || options === void 0 ? void 0 : options.audience)
            ? `${options.audience}/.default`
            : `${constants_js_1.KnownMonitorAudience.AzurePublicCloud}/.default`;
        const packageDetails = `azsdk-js-monitor-query/${constants_js_1.SDK_VERSION}`;
        const userAgentPrefix = (options === null || options === void 0 ? void 0 : options.userAgentOptions) && (options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix)
            ? `${options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        const serviceClientOptions = Object.assign(Object.assign({}, options), { $host: endpoint, endpoint: endpoint, credentialScopes: scope, credential: tokenCredential, userAgentOptions: {
                userAgentPrefix,
            } });
        this._baseUrl = endpoint;
        this._metricBatchClient = new index_js_1.AzureMonitorMetricBatch(this._baseUrl, index_js_1.KnownApiVersion20240201.TwoThousandTwentyFour0201, serviceClientOptions);
    }
    /**
     * Returns all the Azure Monitor metrics requested for the batch of resources.
     */
    async queryResources(resourceIds, metricNames, metricNamespace, options = {}) {
        if (resourceIds.length === 0) {
            throw new Error("Resource IDs can not be empty");
        }
        return tracing_js_1.tracingClient.withSpan("MetricsQueryClient.batch", options, async (updatedOptions) => {
            const subscriptionId = (0, exports.getSubscriptionFromResourceId)(resourceIds[0]);
            const response = await this._metricBatchClient.metricsBatch.batch(subscriptionId, metricNamespace, metricNames, {
                resourceids: resourceIds,
            }, (0, modelConverters_js_1.convertRequestForMetricsBatchQuery)(updatedOptions));
            return (0, modelConverters_js_1.convertResponseForMetricBatch)(response);
        });
    }
}
exports.MetricsClient = MetricsClient;
//# sourceMappingURL=metricsClient.js.map