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
  KnownApiVersion201801,
  MonitorManagementClient as GeneratedMetricsClient
} from "./generated/metrics/src";
import { MonitorManagementClient as GeneratedMetricsDefinitionsClient } from "./generated/metricsdefinitions/src";
import {
  KnownApiVersion20171201Preview,
  MonitorManagementClient as GeneratedMetricsNamespacesClient
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
