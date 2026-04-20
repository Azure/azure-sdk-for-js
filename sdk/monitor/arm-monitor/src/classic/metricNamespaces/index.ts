// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list } from "../../api/metricNamespaces/operations.js";
import type { MetricNamespacesListOptionalParams } from "../../api/metricNamespaces/options.js";
import type { MicrosoftMetricsMetricNamespace } from "../../models/microsoft/metrics/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetricNamespaces operations. */
export interface MetricNamespacesOperations {
  /** Lists the metric namespaces for the resource. */
  list: (
    resourceUri: string,
    options?: MetricNamespacesListOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftMetricsMetricNamespace>;
}

function _getMetricNamespaces(context: MonitorContext) {
  return {
    list: (resourceUri: string, options?: MetricNamespacesListOptionalParams) =>
      list(context, resourceUri, options),
  };
}

export function _getMetricNamespacesOperations(
  context: MonitorContext,
): MetricNamespacesOperations {
  return {
    ..._getMetricNamespaces(context),
  };
}
