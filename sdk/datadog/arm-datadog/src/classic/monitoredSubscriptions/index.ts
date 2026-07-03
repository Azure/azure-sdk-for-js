// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the subscriptions that are being monitored by the Datadog monitor resource */
  update: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
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
    configurationName: string,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
  /** Add the subscriptions that should be monitored by the Datadog monitor resource. */
  createorUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** @deprecated use createorUpdate instead */
  beginCreateorUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<MonitoredSubscriptionProperties>,
      MonitoredSubscriptionProperties
    >
  >;
  /** @deprecated use createorUpdate instead */
  beginCreateorUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
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
    beginDelete: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, monitorName, configurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, monitorName, configurationName, options);
    },
    update: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, configurationName, options),
    beginUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, monitorName, configurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, monitorName, configurationName, options);
    },
    createorUpdate: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
    ) => createorUpdate(context, resourceGroupName, monitorName, configurationName, options),
    beginCreateorUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
    ) => {
      const poller = createorUpdate(
        context,
        resourceGroupName,
        monitorName,
        configurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateorUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: string,
      options?: MonitoredSubscriptionsCreateorUpdateOptionalParams,
    ) => {
      return await createorUpdate(
        context,
        resourceGroupName,
        monitorName,
        configurationName,
        options,
      );
    },
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
