// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext, MonitorClientOptionalParams } from "./api/index.js";
import { createMonitor } from "./api/index.js";
import type { AzureMonitorWorkspacesOperations } from "./classic/azureMonitorWorkspaces/index.js";
import { _getAzureMonitorWorkspacesOperations } from "./classic/azureMonitorWorkspaces/index.js";
import type { IssueOperations } from "./classic/issue/index.js";
import { _getIssueOperations } from "./classic/issue/index.js";
import type { MetricConfigurationsOperations } from "./classic/metricConfigurations/index.js";
import { _getMetricConfigurationsOperations } from "./classic/metricConfigurations/index.js";
import type { MetricNamespacesOperations } from "./classic/metricNamespaces/index.js";
import { _getMetricNamespacesOperations } from "./classic/metricNamespaces/index.js";
import type { MetricsContainersOperations } from "./classic/metricsContainers/index.js";
import { _getMetricsContainersOperations } from "./classic/metricsContainers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TraceAssociationsOperations } from "./classic/traceAssociations/index.js";
import { _getTraceAssociationsOperations } from "./classic/traceAssociations/index.js";
import type { TraceAssociationsAtResourceGroupOperations } from "./classic/traceAssociationsAtResourceGroup/index.js";
import { _getTraceAssociationsAtResourceGroupOperations } from "./classic/traceAssociationsAtResourceGroup/index.js";
import type { TraceAssociationsAtSubscriptionOperations } from "./classic/traceAssociationsAtSubscription/index.js";
import { _getTraceAssociationsAtSubscriptionOperations } from "./classic/traceAssociationsAtSubscription/index.js";
import type { TraceContainersOperations } from "./classic/traceContainers/index.js";
import { _getTraceContainersOperations } from "./classic/traceContainers/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MonitorClientOptionalParams } from "./api/monitorContext.js";

export class MonitorClient {
  private _client: MonitorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MonitorClientOptionalParams = {},
  ) {
    this._client = createMonitor(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.traceAssociations = _getTraceAssociationsOperations(this._client);
    this.traceAssociationsAtSubscription = _getTraceAssociationsAtSubscriptionOperations(
      this._client,
    );
    this.traceAssociationsAtResourceGroup = _getTraceAssociationsAtResourceGroupOperations(
      this._client,
    );
    this.traceContainers = _getTraceContainersOperations(this._client);
    this.metricConfigurations = _getMetricConfigurationsOperations(this._client);
    this.metricNamespaces = _getMetricNamespacesOperations(this._client);
    this.metricsContainers = _getMetricsContainersOperations(this._client);
    this.issue = _getIssueOperations(this._client);
    this.azureMonitorWorkspaces = _getAzureMonitorWorkspacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for traceAssociations */
  public readonly traceAssociations: TraceAssociationsOperations;
  /** The operation groups for traceAssociationsAtSubscription */
  public readonly traceAssociationsAtSubscription: TraceAssociationsAtSubscriptionOperations;
  /** The operation groups for traceAssociationsAtResourceGroup */
  public readonly traceAssociationsAtResourceGroup: TraceAssociationsAtResourceGroupOperations;
  /** The operation groups for traceContainers */
  public readonly traceContainers: TraceContainersOperations;
  /** The operation groups for metricConfigurations */
  public readonly metricConfigurations: MetricConfigurationsOperations;
  /** The operation groups for metricNamespaces */
  public readonly metricNamespaces: MetricNamespacesOperations;
  /** The operation groups for metricsContainers */
  public readonly metricsContainers: MetricsContainersOperations;
  /** The operation groups for issue */
  public readonly issue: IssueOperations;
  /** The operation groups for azureMonitorWorkspaces */
  public readonly azureMonitorWorkspaces: AzureMonitorWorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
