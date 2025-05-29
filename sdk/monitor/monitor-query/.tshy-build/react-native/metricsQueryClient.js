import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { tracingClient } from "./tracing.js";
import { MonitorManagementClient as GeneratedMetricsClient, KnownApiVersion20240201 as MetricsApiVersion, } from "./generated/metrics/src/index.js";
import { MonitorManagementClient as GeneratedMetricsDefinitionsClient, KnownApiVersion20240201 as MetricDefinitionsApiVersion, } from "./generated/metricsdefinitions/src/index.js";
import { MonitorManagementClient as GeneratedMetricsNamespacesClient, KnownApiVersion20240201 as MetricNamespacesApiVersion, } from "./generated/metricsnamespaces/src/index.js";
import { convertRequestForMetrics, convertRequestOptionsForMetricsDefinitions, convertResponseForMetricNamespaces, convertResponseForMetrics, convertResponseForMetricsDefinitions, } from "./internal/modelConverters.js";
import { SDK_VERSION, KnownMonitorMetricsQueryAudience } from "./constants.js";
/**
 * A client that can query metrics, get metric definitions and get metric namespaces.
 */
export class MetricsQueryClient {
    /**
     * Creates a MetricsQueryClient.
     * @param tokenCredential - A TokenCredential that has rights to query metrics on resources.
     * @param options - Options for the client like controlling request retries.
     */
    constructor(tokenCredential, options) {
        const scope = (options === null || options === void 0 ? void 0 : options.audience)
            ? `${options.audience}/.default`
            : `${KnownMonitorMetricsQueryAudience.AzurePublicCloud}/.default`;
        const packageDetails = `azsdk-js-monitor-query/${SDK_VERSION}`;
        const userAgentPrefix = (options === null || options === void 0 ? void 0 : options.userAgentOptions) && (options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix)
            ? `${options === null || options === void 0 ? void 0 : options.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        const serviceClientOptions = Object.assign(Object.assign({}, options), { $host: options === null || options === void 0 ? void 0 : options.endpoint, endpoint: options === null || options === void 0 ? void 0 : options.endpoint, credentialScopes: scope, credential: tokenCredential, userAgentOptions: {
                userAgentPrefix,
            } });
        this._metricsClient = new GeneratedMetricsClient(MetricsApiVersion.TwoThousandTwentyFour0201, serviceClientOptions);
        this._definitionsClient = new GeneratedMetricsDefinitionsClient(MetricDefinitionsApiVersion.TwoThousandTwentyFour0201, serviceClientOptions);
        this._namespacesClient = new GeneratedMetricsNamespacesClient(MetricNamespacesApiVersion.TwoThousandTwentyFour0201, serviceClientOptions);
    }
    /**
     * Query metrics, given a resource URI
     * @param resourceUri - The resource URI to query.
     * @param metricNames - The names of the metrics to retrieve.
     * @param options - Options for querying metrics.
     * @returns A response containing metrics.
     */
    async queryResource(resourceUri, metricNames, options = {}) {
        return tracingClient.withSpan("MetricsQueryClient.queryResource", options, async (updatedOptions) => {
            const response = await this._metricsClient.metrics.list(resourceUri, convertRequestForMetrics(metricNames, updatedOptions));
            return convertResponseForMetrics(response);
        });
    }
    /**
     * List alert segments for Metric Definitions
     */
    listSegmentOfMetricDefinitions(resourceUri_1) {
        return __asyncGenerator(this, arguments, function* listSegmentOfMetricDefinitions_1(resourceUri, options = {}) {
            const segmentResponse = yield __await(tracingClient.withSpan("MetricsQueryClient.listSegmentOfMetricDefinitions", options, async (updatedOptions) => this._definitionsClient.metricDefinitions.list(resourceUri, convertRequestOptionsForMetricsDefinitions(updatedOptions))));
            yield yield __await(convertResponseForMetricsDefinitions(segmentResponse.value));
        });
    }
    /**
     * List items for Metric Definitions
     */
    listItemsOfMetricDefinitions(resourceUri, options) {
        return __asyncGenerator(this, arguments, function* listItemsOfMetricDefinitions_1() {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.listSegmentOfMetricDefinitions(resourceUri, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    if (segment) {
                        yield __await(yield* __asyncDelegator(__asyncValues(segment)));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    /**
     *   /**
     *
     * Returns an async iterable iterator to list metric definitions.
     *
     * Example using `for await` syntax:
     *
     * ```ts snippet:MetricQueryClientListMetricDefinitions
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { MetricsQueryClient } from "@azure/monitor-query";
     *
     * const metricsResourceId = "<the Resource Id for your metrics resource>";
     *
     * const tokenCredential = new DefaultAzureCredential();
     * const metricsQueryClient = new MetricsQueryClient(tokenCredential);
     *
     * const metricDefinitions = metricsQueryClient.listMetricDefinitions(metricsResourceId);
     * for await (const { id, name } of metricDefinitions) {
     *   console.log(` metricDefinitions - ${id}, ${name}`);
     * }
     * ```
     *
     * Get a list of metric definitions, given a resource URI.
     * @param resourceUri - The resource URI to get metric definitions for.
     * @param options - Options for getting metric definitions.
     * @returns Metric definitions for a given resource URI.
     */
    listMetricDefinitions(resourceUri, options) {
        const iter = this.listItemsOfMetricDefinitions(resourceUri, options);
        return {
            /**
             * The next method, part of the iteration protocol
             */
            next() {
                return iter.next();
            },
            /**
             * The connection to the async iterator, part of the iteration protocol
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             * @returns an AsyncIterableIterator that works a page at a time
             */
            byPage: () => {
                return this.listSegmentOfMetricDefinitions(resourceUri, options);
            },
        };
    }
    /**
     * List alert segments for Metric Namespaces
     */
    listSegmentOfMetricNamespaces(resourceUri_1) {
        return __asyncGenerator(this, arguments, function* listSegmentOfMetricNamespaces_1(resourceUri, options = {}) {
            const segmentResponse = yield __await(tracingClient.withSpan("MetricsQueryClient.listSegmentOfMetricNamespaces", options, async (updatedOptions) => this._namespacesClient.metricNamespaces.list(resourceUri, updatedOptions)));
            yield yield __await(convertResponseForMetricNamespaces(segmentResponse.value));
        });
    }
    /**
     * List items for Metric Namespaces
     */
    listItemsOfMetricNamespaces(resourceUri, options) {
        return __asyncGenerator(this, arguments, function* listItemsOfMetricNamespaces_1() {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(this.listSegmentOfMetricNamespaces(resourceUri, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const segment = _c;
                    if (segment) {
                        yield __await(yield* __asyncDelegator(__asyncValues(segment)));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    /**
     *
     * Returns an async iterable iterator to list metric namespaces.
     *
     * Example using `for await` syntax:
     *
     * ```ts snippet:MetricQueryClientListMetricNamespaces
     * import { DefaultAzureCredential } from "@azure/identity";
     * import { MetricsQueryClient } from "@azure/monitor-query";
     *
     * const metricsResourceId = "<the Resource Id for your metrics resource>";
     *
     * const tokenCredential = new DefaultAzureCredential();
     * const metricsQueryClient = new MetricsQueryClient(tokenCredential);
     *
     * const metricNamespaces = metricsQueryClient.listMetricNamespaces(metricsResourceId);
     * for await (const { id, name } of metricNamespaces) {
     *   console.log(` metricNamespaces - ${id}, ${name}`);
     * }
     * ```
     *
     * Get a list of metric namespaces, given a resource URI.
     * @param resourceUri - The resource URI to get metric namespaces for.
     * @param options - Options for getting metric namespaces.
     * @returns Metric namespaces for a given resource URI.
     */
    listMetricNamespaces(resourceUri, options) {
        const iter = this.listItemsOfMetricNamespaces(resourceUri, options);
        return {
            /**
             * The next method, part of the iteration protocol
             */
            next() {
                return iter.next();
            },
            /**
             * The connection to the async iterator, part of the iteration protocol
             */
            [Symbol.asyncIterator]() {
                return this;
            },
            /**
             * @returns an AsyncIterableIterator that works a page at a time
             */
            byPage: () => {
                return this.listSegmentOfMetricNamespaces(resourceUri, options);
            },
        };
    }
}
//# sourceMappingURL=metricsQueryClient.js.map