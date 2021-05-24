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
  MetricsListResponse,
  MonitorManagementClient as GeneratedMetricsClient
} from "./generated/metrics/src";
import {
  MetricDefinitionsListResponse,
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
  QueryMetricsOptions
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

  queryMetrics(resourceUri: string, options?: QueryMetricsOptions): Promise<MetricsListResponse> {
    return this._metricsClient.metrics.list(resourceUri, options);
  }

  getMetricDefinitions(
    resourceUri: string,
    options?: GetMetricDefinitionsOptions
  ): Promise<MetricDefinitionsListResponse> {
    return this._definitionsClient.metricDefinitions.list(resourceUri, options);
  }

  getMetricNamespaces(
    resourceUri: string,
    options?: GetMetricNamespaces
  ): Promise<MetricNamespacesListResponse> {
    return this._namespacesClient.metricNamespaces.list(resourceUri, options);
  }
}

function formatScope(endpoint: string | undefined) {
  if (endpoint) {
    if (endpoint.endsWith("/")) {
      endpoint += "/";
    }

    return `${endpoint}/.default`;
  } else {
    return "https://management.azure.com/.default";
  }
}
