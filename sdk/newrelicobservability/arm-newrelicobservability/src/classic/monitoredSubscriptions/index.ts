// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
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
import type { MonitoredSubscriptionProperties, ConfigurationName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MonitoredSubscriptions operations. */
export interface MonitoredSubscriptionsOperations {
  /** List MonitoredSubscriptionProperties resources by NewRelicMonitorResource */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredSubscriptionProperties>;
  /** Delete a MonitoredSubscriptionProperties */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a MonitoredSubscriptionProperties */
  update: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** Create a MonitoredSubscriptionProperties */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** Get a MonitoredSubscriptionProperties */
  get: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsGetOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
}

function _getMonitoredSubscriptions(context: NewRelicObservabilityContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, configurationName, options),
    update: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, configurationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, configurationName, options),
    get: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, configurationName, options),
  };
}

export function _getMonitoredSubscriptionsOperations(
  context: NewRelicObservabilityContext,
): MonitoredSubscriptionsOperations {
  return {
    ..._getMonitoredSubscriptions(context),
  };
}
