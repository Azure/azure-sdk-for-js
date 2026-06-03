// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ObservabilityContext } from "../../api/observabilityContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/monitoredSubscriptions/operations.js";
import type {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "../../api/monitoredSubscriptions/options.js";
import type { MonitoredSubscriptionProperties } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MonitoredSubscriptions operations. */
export interface MonitoredSubscriptionsOperations {
  /** List the subscriptions currently being monitored by the Dynatrace monitor resource. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredSubscriptionProperties>;
  /** Updates the subscriptions that are being monitored by the Dynatrace monitor resource */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the subscriptions that are being monitored by the Dynatrace monitor resource */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** Add the subscriptions that should be monitored by the Dynatrace monitor resource. */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** List the subscriptions currently being monitored by the Dynatrace monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsGetOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
}

function _getMonitoredSubscriptions(context: ObservabilityContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, options),
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitoredSubscriptionsOperations(
  context: ObservabilityContext,
): MonitoredSubscriptionsOperations {
  return {
    ..._getMonitoredSubscriptions(context),
  };
}
