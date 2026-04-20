// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list, listAtSubscriptionScope } from "../../api/metricDefinitions/operations.js";
import type {
  MetricDefinitionsListOptionalParams,
  MetricDefinitionsListAtSubscriptionScopeOptionalParams,
} from "../../api/metricDefinitions/options.js";
import type {
  MicrosoftMetricsSubscriptionScopeMetricDefinition,
  MicrosoftMetricsMetricDefinition,
} from "../../models/microsoft/metrics/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MetricDefinitions operations. */
export interface MetricDefinitionsOperations {
  /** Lists the metric definitions for the resource. */
  list: (
    resourceUri: string,
    options?: MetricDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftMetricsMetricDefinition>;
  /** Lists the metric definitions for the subscription. */
  listAtSubscriptionScope: (
    region: string,
    options?: MetricDefinitionsListAtSubscriptionScopeOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftMetricsSubscriptionScopeMetricDefinition>;
}

function _getMetricDefinitions(context: MonitorContext) {
  return {
    list: (resourceUri: string, options?: MetricDefinitionsListOptionalParams) =>
      list(context, resourceUri, options),
    listAtSubscriptionScope: (
      region: string,
      options?: MetricDefinitionsListAtSubscriptionScopeOptionalParams,
    ) => listAtSubscriptionScope(context, region, options),
  };
}

export function _getMetricDefinitionsOperations(
  context: MonitorContext,
): MetricDefinitionsOperations {
  return {
    ..._getMetricDefinitions(context),
  };
}
