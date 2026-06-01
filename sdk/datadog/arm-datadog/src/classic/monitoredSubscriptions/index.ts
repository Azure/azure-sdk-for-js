// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import {
  list,
  $delete,
  update,
  createorUpdate,
  get,
} from "../../api/monitoredSubscriptions/operations.js";
import {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "../../api/monitoredSubscriptions/options.js";
import { MonitoredSubscriptionProperties } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MonitoredSubscriptions operations. */
export interface MonitoredSubscriptionsOperations {
  /** List the subscriptions currently being monitored by the Datadog monitor resource. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredSubscriptionProperties>;
  /** Updates the subscriptions that are being monitored by the Datadog monitor resource */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the subscriptions that are being monitored by the Datadog monitor resource */
  update: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** Add the subscriptions that should be monitored by the Datadog monitor resource. */
  createorUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** List the subscriptions currently being monitored by the Datadog monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsGetOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
}

function _getMonitoredSubscriptions(context: MicrosoftDatadogContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, configurationName, options),
    update: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, configurationName, options),
    createorUpdate: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
    ) => createorUpdate(context, resourceGroupName, monitorName, configurationName, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, configurationName, options),
  };
}

export function _getMonitoredSubscriptionsOperations(
  context: MicrosoftDatadogContext,
): MonitoredSubscriptionsOperations {
  return {
    ..._getMonitoredSubscriptions(context),
  };
}
