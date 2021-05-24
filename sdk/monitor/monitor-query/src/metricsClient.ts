// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  PipelineOptions
} from "@azure/core-http";
import {
  KnownApiVersion201801,
  MetricsListOptionalParams as GeneratedMetricsListOptionalParams,
  MetricsListResponse,
  MonitorManagementClient as GeneratedMetricsClient
} from "./generated/metrics/src";
import {
  MetricDefinitionsListResponse,
  MetricDefinitionsListOptionalParams as GeneratedMetricDefinitionsListOptionalParams,
  MonitorManagementClient as GeneratedMetricsDefinitionsClient
} from "./generated/metricsdefinitions/src";
import {
  KnownApiVersion20171201Preview,
  MetricNamespacesListResponse,
  MonitorManagementClient as GeneratedMetricsNamespacesClient
} from "./generated/metricsnamespaces/src";
import {
  GetMetricDefinitionsOptions,
  GetMetricNamespaces,
  QueryMetricsOptions,
  QueryMetricsResponse
} from "./models/metricsModels";

export interface MetricsClientOptions extends PipelineOptions {
  /** server parameter */
  $host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}

export class MetricsClient {
  private _metricsClient: GeneratedMetricsClient;
  private _definitionsClient: GeneratedMetricsDefinitionsClient;
  private _namespacesClient: GeneratedMetricsNamespacesClient;

  constructor(tokenCredential: TokenCredential, options?: MetricsClientOptions) {
    const bearerTokenPolicy = bearerTokenAuthenticationPolicy(
      tokenCredential,
      formatScope(options?.endpoint)
    );

    const serviceClientOptions = {
      ...createPipelineFromOptions(options || {}, bearerTokenPolicy),
      $host: options?.$host,
      endpoint: options?.endpoint
    };

    this._metricsClient = new GeneratedMetricsClient(
      tokenCredential,
      KnownApiVersion201801.TwoThousandEighteen0101,
      serviceClientOptions
    );

    this._definitionsClient = new GeneratedMetricsDefinitionsClient(
      tokenCredential,
      KnownApiVersion201801.TwoThousandEighteen0101,
      serviceClientOptions
    );

    this._namespacesClient = new GeneratedMetricsNamespacesClient(
      tokenCredential,
      KnownApiVersion20171201Preview.TwoThousandSeventeen1201Preview,
      serviceClientOptions
    );
  }

  queryMetrics(resourceUri: string, options?: QueryMetricsOptions): Promise<QueryMetricsResponse> {
    return this._metricsClient.metrics.list(resourceUri, convertToMetricsRequest(options));
  }

  getMetricDefinitions(
    resourceUri: string,
    options?: GetMetricDefinitionsOptions
  ): Promise<MetricDefinitionsListResponse> {
    return this._definitionsClient.metricDefinitions.list(
      resourceUri,
      convertToMetricsDefinitionsRequest(options)
    );
  }

  getMetricNamespaces(
    resourceUri: string,
    options?: GetMetricNamespaces
  ): Promise<MetricNamespacesListResponse> {
    return this._namespacesClient.metricNamespaces.list(resourceUri, options);
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

/**
 * @internal
 */
export function convertToMetricsRequest(
  queryMetricsOptions: QueryMetricsOptions | undefined
): GeneratedMetricsListOptionalParams {
  const obj: GeneratedMetricsListOptionalParams & QueryMetricsOptions = {
    ...queryMetricsOptions,
    orderby: queryMetricsOptions?.orderBy,
    metricnames: queryMetricsOptions?.metricNames?.join(","),
    aggregation: queryMetricsOptions?.aggregations?.join(","),
    metricnamespace: queryMetricsOptions?.metricNamespace
  };

  delete obj["orderBy"];
  delete obj["aggregations"];
  delete obj["metricNames"];
  delete obj["metricNamespace"];

  return obj;
}

/**
 * @internal
 */
export function convertMetricsResponse(
  generatedResponse: MetricsListResponse
): QueryMetricsResponse {
  const obj: MetricsListResponse & QueryMetricsResponse = {
    ...generatedResponse,
    resourceRegion: generatedResponse.resourceregion
  };

  delete obj["resourceregion"];
  delete (obj as any)["_response"];

  return obj;
}

/**
 * @internal
 */
export function convertToMetricsDefinitionsRequest(
  options: GetMetricDefinitionsOptions | undefined
): GeneratedMetricDefinitionsListOptionalParams {
  const obj = {
    ...options,
    metricnamespace: options?.metricNamespace
  };

  delete obj["metricNamespace"];
  return obj;
}
