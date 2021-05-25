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
      MetricsApiVersion.TwoThousandSeventeen0501Preview,
      serviceClientOptions
    );

    this._definitionsClient = new GeneratedMetricsDefinitionsClient(
      tokenCredential,
      MetricDefinitionsApiVersion.TwoThousandSeventeen0501Preview,
      serviceClientOptions
    );

    this._namespacesClient = new GeneratedMetricsNamespacesClient(
      tokenCredential,
      MetricNamespacesApiVersion.TwoThousandSeventeen1201Preview,
      serviceClientOptions
    );
  }

  async queryMetrics(
    resourceUri: string,
    options?: QueryMetricsOptions
  ): Promise<QueryMetricsResponse> {
    const response = await this._metricsClient.metrics.list(
      resourceUri,
      convertRequestForMetrics(options)
    );

    return convertResponseForMetrics(response);
  }

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
