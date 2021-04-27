// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import {
  MetricsListResponse,
  MonitorManagementClient as GeneratedMetricsClient
} from "./generated/metrics/src";
import {
  MetricDefinitionsListResponse,
  MonitorManagementClient as GeneratedMetricsDefinitionsClient
} from "./generated/metricsdefinitions/src";
import {
  MetricNamespacesListResponse,
  MonitorManagementClient as GeneratedMetricsNamespacesClient
} from "./generated/metricsnamespaces/src";
import {
  GetMetricDefinitionsOptions,
  GetMetricNamespaces,
  QueryMetricsOptions
} from "./models/metricsModels";

export class MetricsClient {
  private _metricsClient: GeneratedMetricsClient;
  private _definitionsClient: GeneratedMetricsDefinitionsClient;
  private _namespacesClient: GeneratedMetricsNamespacesClient;

  constructor(tokenCredential: TokenCredential) {
    this._metricsClient = new GeneratedMetricsClient(tokenCredential, "2018-01-01", {});

    this._definitionsClient = new GeneratedMetricsDefinitionsClient(
      tokenCredential,
      "2018-01-01",
      {}
    );

    this._namespacesClient = new GeneratedMetricsNamespacesClient(
      tokenCredential,
      "2017-12-01-preview",
      {}
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
