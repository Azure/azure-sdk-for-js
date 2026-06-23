// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/monitoringConfig/operations.js";
import type {
  MonitoringConfigListOptionalParams,
  MonitoringConfigDeleteOptionalParams,
  MonitoringConfigCreateOrUpdateOptionalParams,
  MonitoringConfigGetOptionalParams,
} from "../../api/monitoringConfig/options.js";
import type { MonitoringMetricConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MonitoringConfig operations. */
export interface MonitoringConfigOperations {
  /** Lists metric configurations in a role. */
  list: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoringMetricConfiguration>;
  /** deletes a new metric configuration for a role. */
  delete: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new metric configuration or updates an existing one for a role. */
  createOrUpdate: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    monitoringMetricConfiguration: MonitoringMetricConfiguration,
    options?: MonitoringConfigCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitoringMetricConfiguration>, MonitoringMetricConfiguration>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    monitoringMetricConfiguration: MonitoringMetricConfiguration,
    options?: MonitoringConfigCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MonitoringMetricConfiguration>, MonitoringMetricConfiguration>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    monitoringMetricConfiguration: MonitoringMetricConfiguration,
    options?: MonitoringConfigCreateOrUpdateOptionalParams,
  ) => Promise<MonitoringMetricConfiguration>;
  /** Gets a  metric configuration of a role. */
  get: (
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigGetOptionalParams,
  ) => Promise<MonitoringMetricConfiguration>;
}

function _getMonitoringConfig(context: DataBoxEdgeManagementContext) {
  return {
    list: (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      options?: MonitoringConfigListOptionalParams,
    ) => list(context, deviceName, roleName, resourceGroupName, options),
    delete: (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      options?: MonitoringConfigDeleteOptionalParams,
    ) => $delete(context, deviceName, roleName, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      options?: MonitoringConfigDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, roleName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      options?: MonitoringConfigDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, roleName, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      monitoringMetricConfiguration: MonitoringMetricConfiguration,
      options?: MonitoringConfigCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        deviceName,
        roleName,
        resourceGroupName,
        monitoringMetricConfiguration,
        options,
      ),
    beginCreateOrUpdate: async (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      monitoringMetricConfiguration: MonitoringMetricConfiguration,
      options?: MonitoringConfigCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        deviceName,
        roleName,
        resourceGroupName,
        monitoringMetricConfiguration,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      monitoringMetricConfiguration: MonitoringMetricConfiguration,
      options?: MonitoringConfigCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        deviceName,
        roleName,
        resourceGroupName,
        monitoringMetricConfiguration,
        options,
      );
    },
    get: (
      deviceName: string,
      roleName: string,
      resourceGroupName: string,
      options?: MonitoringConfigGetOptionalParams,
    ) => get(context, deviceName, roleName, resourceGroupName, options),
  };
}

export function _getMonitoringConfigOperations(
  context: DataBoxEdgeManagementContext,
): MonitoringConfigOperations {
  return {
    ..._getMonitoringConfig(context),
  };
}
