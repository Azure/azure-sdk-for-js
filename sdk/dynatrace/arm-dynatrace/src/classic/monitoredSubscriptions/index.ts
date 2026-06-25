// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservabilityContext } from "../../api/dynatraceObservabilityContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/monitoredSubscriptions/operations.js";
import {
  MonitoredSubscriptionsListOptionalParams,
  MonitoredSubscriptionsDeleteOptionalParams,
  MonitoredSubscriptionsUpdateOptionalParams,
  MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  MonitoredSubscriptionsGetOptionalParams,
} from "../../api/monitoredSubscriptions/options.js";
import { MonitoredSubscriptionProperties } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the subscriptions that are being monitored by the Dynatrace monitor resource */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MonitoredSubscriptionProperties>,
      MonitoredSubscriptionProperties
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
  /** Add the subscriptions that should be monitored by the Dynatrace monitor resource. */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MonitoredSubscriptionProperties>,
      MonitoredSubscriptionProperties
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
  /** List the subscriptions currently being monitored by the Dynatrace monitor resource. */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredSubscriptionsGetOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
}

function _getMonitoredSubscriptions(context: DynatraceObservabilityContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, monitorName, options);
    },
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
    beginUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, monitorName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, monitorName, options);
    },
    get: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitoredSubscriptionsOperations(
  context: DynatraceObservabilityContext,
): MonitoredSubscriptionsOperations {
  return {
    ..._getMonitoredSubscriptions(context),
  };
}
