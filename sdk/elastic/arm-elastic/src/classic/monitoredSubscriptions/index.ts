// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import {
  list,
  $delete,
  update,
  createorUpdate,
  get,
} from "../../api/monitoredSubscriptions/operations.js";
import type {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateorUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "../../api/monitoredSubscriptions/options.js";
import type { MonitoredSubscriptionProperties } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MonitoredSubscriptions operations. */
export interface MonitoredSubscriptionsOperations {
  /** List all subscriptions currently being monitored by the Elastic monitor resource, helping you manage observability. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredSubscriptionProperties>;
  /** Delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update subscriptions to be monitored by the Elastic monitor resource, ensuring optimal observability and performance. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** Add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring. */
  createorUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** Get detailed information about all subscriptions currently being monitored by the Elastic monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsGetOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
}

function _getMonitoredSubscriptions(context: MicrosoftElasticContext) {
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
  context: MicrosoftElasticContext,
): MonitoredSubscriptionsOperations {
  return {
    ..._getMonitoredSubscriptions(context),
  };
}
