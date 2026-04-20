// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import {
  list,
  listAtSubscriptionScopePost,
  listAtSubscriptionScope,
} from "../../api/metrics/operations.js";
import type {
  MetricsListOptionalParams,
  MetricsListAtSubscriptionScopePostOptionalParams,
  MetricsListAtSubscriptionScopeOptionalParams,
} from "../../api/metrics/options.js";
import type { MicrosoftMetricsResponse } from "../../models/microsoft/metrics/models.js";

/** Interface representing a Metrics operations. */
export interface MetricsOperations {
  /** **Lists the metric values for a resource**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling). */
  list: (
    resourceUri: string,
    options?: MetricsListOptionalParams,
  ) => Promise<MicrosoftMetricsResponse>;
  /** **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling). */
  listAtSubscriptionScopePost: (
    region: string,
    options?: MetricsListAtSubscriptionScopePostOptionalParams,
  ) => Promise<MicrosoftMetricsResponse>;
  /** **Lists the metric data for a subscription**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling). */
  listAtSubscriptionScope: (
    region: string,
    options?: MetricsListAtSubscriptionScopeOptionalParams,
  ) => Promise<MicrosoftMetricsResponse>;
}

function _getMetrics(context: MonitorContext) {
  return {
    list: (resourceUri: string, options?: MetricsListOptionalParams) =>
      list(context, resourceUri, options),
    listAtSubscriptionScopePost: (
      region: string,
      options?: MetricsListAtSubscriptionScopePostOptionalParams,
    ) => listAtSubscriptionScopePost(context, region, options),
    listAtSubscriptionScope: (
      region: string,
      options?: MetricsListAtSubscriptionScopeOptionalParams,
    ) => listAtSubscriptionScope(context, region, options),
  };
}

export function _getMetricsOperations(context: MonitorContext): MetricsOperations {
  return {
    ..._getMetrics(context),
  };
}
