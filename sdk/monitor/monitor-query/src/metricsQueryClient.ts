// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  PipelineOptions
} from "@azure/core-http";

import {
  GetMetricDefinitionsOptions,
  GetMetricDefinitionsResponse,
  GetMetricNamespacesOptions,
  GetMetricNamespacesResponse,
  QueryMetricsOptions,
  QueryMetricsResponse
} from "./models/publicMetricsModels";

import {
  KnownApiVersion20170501Preview as MetricsApiVersion,
  MonitorManagementClient as GeneratedMetricsClient
} from "./generated/metrics/src";
import {
  KnownApiVersion20170501Preview as MetricDefinitionsApiVersion,
  MetricsDefinitionsClient as GeneratedMetricsDefinitionsClient
} from "./generated/metricsdefinitions/src";
import {
  KnownApiVersion20171201Preview as MetricNamespacesApiVersion,
  MetricsNamespacesClient as GeneratedMetricsNamespacesClient
} from "./generated/metricsnamespaces/src";
import {
  convertRequestForMetrics,
  convertRequestOptionsForMetricsDefinitions,
  convertResponseForMetricNamespaces,
  convertResponseForMetrics,
  convertResponseForMetricsDefinitions
} from "./internal/modelConverters";

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
    const bearerTokenPolicy = bearerTokenAuthenticationPolicy(
      tokenCredential,
      formatScope(options?.endpoint)
    );

    const serviceClientOptions = {
      ...createPipelineFromOptions(options || {}, bearerTokenPolicy),
      $host: options?.endpoint,
      endpoint: options?.endpoint
    };

    this._metricsClient = new GeneratedMetricsClient(
      MetricsApiVersion.TwoThousandSeventeen0501Preview,
      serviceClientOptions
    );

    this._definitionsClient = new GeneratedMetricsDefinitionsClient(
      MetricDefinitionsApiVersion.TwoThousandSeventeen0501Preview,
      serviceClientOptions
    );

    this._namespacesClient = new GeneratedMetricsNamespacesClient(
      MetricNamespacesApiVersion.TwoThousandSeventeen1201Preview,
      serviceClientOptions
    );
  }

  /**
   * Query metrics, given a resource URI
   * @param resourceUri - The resource URI to query.
   * @param timespan - The enclosing timespan for metrics.
   * @param options - Options for querying metrics.
   * @returns A response containing metrics.
   */
  async queryMetrics(
    resourceUri: string,
    timespan: string,
    options?: QueryMetricsOptions
  ): Promise<QueryMetricsResponse> {
    const response = await this._metricsClient.metrics.list(
      resourceUri,
      convertRequestForMetrics(timespan, options)
    );

    return convertResponseForMetrics(response);
  }

  /**
   * Get a list of metric definitions, given a resource URI.
   * @param resourceUri - The resource URI to get metric definitions for.
   * @param options - Options for getting metric definitions.
   * @returns Metric definitions for a given resource URI.
   */
  async getMetricDefinitions(
    resourceUri: string,
    options?: GetMetricDefinitionsOptions
  ): Promise<GetMetricDefinitionsResponse> {
    const response = await this._definitionsClient.metricDefinitions.list(
      resourceUri,
      convertRequestOptionsForMetricsDefinitions(options)
    );

    return convertResponseForMetricsDefinitions(response);
  }

  /**
   * Get a list of metric namespaces, given a resource URI.
   * @param resourceUri - The resource URI to get metric namespaces for.
   * @param options - Options for getting metric namespaces.
   * @returns Metric namespaces for a given resource URI.
   */
  async getMetricNamespaces(
    resourceUri: string,
    options?: GetMetricNamespacesOptions
  ): Promise<GetMetricNamespacesResponse> {
    const response = await this._namespacesClient.metricNamespaces.list(resourceUri, options);
    return convertResponseForMetricNamespaces(response);
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
