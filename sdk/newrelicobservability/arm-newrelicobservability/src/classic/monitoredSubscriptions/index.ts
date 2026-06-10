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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a MonitoredSubscriptionProperties */
  update: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
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
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsUpdateOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
  /** Create a MonitoredSubscriptionProperties */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoredSubscriptionProperties>, MonitoredSubscriptionProperties>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    configurationName: ConfigurationName,
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
    configurationName: ConfigurationName,
    options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<MonitoredSubscriptionProperties>;
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
    beginDelete: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, monitorName, configurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, monitorName, configurationName, options);
    },
    update: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, configurationName, options),
    beginUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, monitorName, configurationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, monitorName, configurationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, configurationName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        monitorName,
        configurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      configurationName: ConfigurationName,
      options?: MonitoredSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
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
