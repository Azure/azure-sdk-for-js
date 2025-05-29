import type { TokenCredential } from "@azure/core-auth";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { CommonClientOptions } from "@azure/core-client";
import type { ListMetricDefinitionsOptions, ListMetricNamespacesOptions, MetricDefinition, MetricNamespace, MetricsQueryOptions, MetricsQueryResult } from "./models/publicMetricsModels.js";
/**
 * Options for the MetricsQueryClient.
 */
export interface MetricsQueryClientOptions extends CommonClientOptions {
    /** Overrides client endpoint. */
    endpoint?: string;
    /**
     * The Audience to use for authentication with Microsoft Entra ID. The
     * audience is not considered when using a shared key.
     * {@link KnownMonitorMetricsQueryAudience} can be used interchangeably with audience
     */
    audience?: string;
}
/**
 * A client that can query metrics, get metric definitions and get metric namespaces.
 */
export declare class MetricsQueryClient {
    private _metricsClient;
    private _definitionsClient;
    private _namespacesClient;
    /**
     * Creates a MetricsQueryClient.
     * @param tokenCredential - A TokenCredential that has rights to query metrics on resources.
     * @param options - Options for the client like controlling request retries.
     */
    constructor(tokenCredential: TokenCredential, options?: MetricsQueryClientOptions);
    /**
     * Query metrics, given a resource URI
     * @param resourceUri - The resource URI to query.
     * @param metricNames - The names of the metrics to retrieve.
     * @param options - Options for querying metrics.
     * @returns A response containing metrics.
     */
    queryResource(resourceUri: string, metricNames: string[], options?: MetricsQueryOptions): Promise<MetricsQueryResult>;
    /**
     * List alert segments for Metric Definitions
     */
    private listSegmentOfMetricDefinitions;
    /**
     * List items for Metric Definitions
     */
    private listItemsOfMetricDefinitions;
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
    listMetricDefinitions(resourceUri: string, options?: ListMetricDefinitionsOptions): PagedAsyncIterableIterator<MetricDefinition>;
    /**
     * List alert segments for Metric Namespaces
     */
    private listSegmentOfMetricNamespaces;
    /**
     * List items for Metric Namespaces
     */
    private listItemsOfMetricNamespaces;
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
    listMetricNamespaces(resourceUri: string, options?: ListMetricNamespacesOptions): PagedAsyncIterableIterator<MetricNamespace>;
}
//# sourceMappingURL=metricsQueryClient.d.ts.map