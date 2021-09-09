// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import { PipelineOptions, bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import {
  ListMetricDefinitionsOptions,
  ListMetricNamespacesOptions,
  MetricsQueryOptions,
  MetricsQueryResult,
  MetricDefinition
} from "./models/publicMetricsModels";

import {
  KnownApiVersion201801 as MetricsApiVersion,
  MonitorManagementClient as GeneratedMetricsClient
} from "./generated/metrics/src";
import {
  KnownApiVersion201801 as MetricDefinitionsApiVersion,
  MonitorManagementClient as GeneratedMetricsDefinitionsClient
} from "./generated/metricsdefinitions/src";
import {
  KnownApiVersion20171201Preview as MetricNamespacesApiVersion,
  MetricNamespace,
  MonitorManagementClient as GeneratedMetricsNamespacesClient
} from "./generated/metricsnamespaces/src";
import {
  convertRequestForMetrics,
  convertRequestOptionsForMetricsDefinitions,
  convertResponseForMetricNamespaces,
  convertResponseForMetrics,
  convertResponseForMetricsDefinitions
} from "./internal/modelConverters";

/**
 * Options for the MetricsQueryClient.
 */
export interface MetricsQueryClientOptions extends PipelineOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}

/**
 * A client that can query metrics, get metric definitions and get metric namespaces.
 */
export class MetricsQueryClient {
  private _metricsClient: GeneratedMetricsClient;
  private _definitionsClient: GeneratedMetricsDefinitionsClient;
  private _namespacesClient: GeneratedMetricsNamespacesClient;

  /**
   * Creates a MetricsQueryClient.
   * @param tokenCredential - A TokenCredential that has rights to query metrics on resources.
   * @param options - Options for the client like controlling request retries.
   */
  constructor(tokenCredential: TokenCredential, options?: MetricsQueryClientOptions) {
    const serviceClientOptions = {
      ...options,
      $host: options?.endpoint,
      endpoint: options?.endpoint
    };
    const bearerTokenPolicy = bearerTokenAuthenticationPolicy({
      credential: tokenCredential,
      scopes: formatScope(options?.endpoint)
    });
    this._metricsClient = new GeneratedMetricsClient(
      MetricsApiVersion.TwoThousandEighteen0101,
      serviceClientOptions
    );
    this._metricsClient.pipeline.addPolicy(bearerTokenPolicy);

    this._definitionsClient = new GeneratedMetricsDefinitionsClient(
      MetricDefinitionsApiVersion.TwoThousandEighteen0101,
      serviceClientOptions
    );
    this._definitionsClient.pipeline.addPolicy(bearerTokenPolicy);

    this._namespacesClient = new GeneratedMetricsNamespacesClient(
      MetricNamespacesApiVersion.TwoThousandSeventeen1201Preview,
      serviceClientOptions
    );
    this._namespacesClient.pipeline.addPolicy(bearerTokenPolicy);
  }

  /**
   * Query metrics, given a resource URI
   * @param resourceUri - The resource URI to query.
   * @param metricNames - The names of the metrics to retrieve.
   * @param options - Options for querying metrics.
   * @returns A response containing metrics.
   */
  async query(
    resourceUri: string,
    metricNames: string[],
    options?: MetricsQueryOptions
  ): Promise<MetricsQueryResult> {
    const response = await this._metricsClient.metrics.list(
      resourceUri,
      convertRequestForMetrics(metricNames, options)
    );

    return convertResponseForMetrics(response);
  }

  /**
   * List alert segments for Metric Definitions
   */
  private async *listSegmentOfMetricDefinitions(
    resourceUri: string,
    options: ListMetricDefinitionsOptions = {}
  ): AsyncIterableIterator<Array<MetricDefinition>> {
    const segmentResponse = await this._definitionsClient.metricDefinitions.list(
      resourceUri,
      convertRequestOptionsForMetricsDefinitions(options)
    );
    yield convertResponseForMetricsDefinitions(segmentResponse.value);
  }

  /**
   * List items for Metric Definitions
   */
  private async *listItemsOfMetricDefinitions(
    resourceUri: string,
    options?: ListMetricDefinitionsOptions
  ): AsyncIterableIterator<MetricDefinition> {
    for await (const segment of this.listSegmentOfMetricDefinitions(resourceUri, options)) {
      if (segment) {
        yield* segment;
      }
    }
  }

  /**
   *   /**
   *
   * Returns an async iterable iterator to list metric definitions.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const metricsQueryClient = new MetricsQueryClient(tokenCredential);
   * const metricDefinitions = client.listMetricDefinitions(resourceUri, options);
   * let i = 1;
   * for await (const metricDefinition of metricDefinitions) {
   *   console.log(`metricDefinition ${i++}:`);
   *   console.log(metricDefinition);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listMetricDefinitions(resourceUri, options);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` metricDefinitions - ${result.value.id}, ${result.value.name}`);
   *   result = await iter.next();
   * }
   * ```
   *
   * Get a list of metric definitions, given a resource URI.
   * @param resourceUri - The resource URI to get metric definitions for.
   * @param options - Options for getting metric definitions.
   * @returns Metric definitions for a given resource URI.
   */
  listMetricDefinitions(
    resourceUri: string,
    options?: ListMetricDefinitionsOptions
  ): PagedAsyncIterableIterator<MetricDefinition> {
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
      }
    };
  }

  /**
   * List alert segments for Metric Namespaces
   */
  private async *listSegmentOfMetricNamespaces(
    resourceUri: string,
    options: ListMetricNamespacesOptions = {}
  ): AsyncIterableIterator<Array<MetricNamespace>> {
    const segmentResponse = await this._namespacesClient.metricNamespaces.list(
      resourceUri,
      options
    );
    yield convertResponseForMetricNamespaces(segmentResponse.value);
  }
  /**
   * List items for Metric Namespaces
   */
  private async *listItemsOfMetricNamespaces(
    resourceUri: string,
    options?: ListMetricNamespacesOptions
  ): AsyncIterableIterator<MetricNamespace> {
    for await (const segment of this.listSegmentOfMetricNamespaces(resourceUri, options)) {
      if (segment) {
        yield* segment;
      }
    }
  }
  /**
   *
   * Returns an async iterable iterator to list metric namespaces.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * const metricsQueryClient = new MetricsQueryClient(tokenCredential);
   * const metricNamespaces = client.listMetricNamespaces(resourceUri, options);
   * let i = 1;
   * for await (const metricNamespace of metricNamespaces) {
   *   console.log(`metricNamespace ${i++}:`);
   *   console.log(metricNamespace);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = client.listMetricNamespaces(resourceUri, options);
   * let result = await iter.next();
   * while (!result.done) {
   *   console.log(` metricNamespace - ${result.value.id}, ${result.value.name}`);
   *   result = await iter.next();
   * }
   * ```
   * Get a list of metric namespaces, given a resource URI.
   * @param resourceUri - The resource URI to get metric namespaces for.
   * @param options - Options for getting metric namespaces.
   * @returns Metric namespaces for a given resource URI.
   */
  listMetricNamespaces(
    resourceUri: string,
    options?: ListMetricNamespacesOptions
  ): PagedAsyncIterableIterator<MetricNamespace> {
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
      }
    };
  }
}

function formatScope(endpoint: string | undefined): string {
  if (endpoint) {
    if (endpoint.endsWith("/")) {
      endpoint += "/";
    }

    return `${endpoint}/.default`;
  } else {
    return "https://management.azure.com/.default";
  }
}
