// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import {
  listByOrganization,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/monitorResources/operations.js";
import type {
  MonitorResourcesListByOrganizationOptionalParams,
  MonitorResourcesDeleteOptionalParams,
  MonitorResourcesUpdateOptionalParams,
  MonitorResourcesCreateOrUpdateOptionalParams,
  MonitorResourcesGetOptionalParams,
} from "../../api/monitorResources/options.js";
import type { MonitorResource, MonitorResourceUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MonitorResources operations. */
export interface MonitorResourcesOperations {
  /** Lists the monitors configured under a Confluent organization. */
  listByOrganization: (
    resourceGroupName: string,
    organizationName: string,
    options?: MonitorResourcesListByOrganizationOptionalParams,
  ) => PagedAsyncIterableIterator<MonitorResource>;
  /**
   * Deletes a monitor and stops sending Azure logs to its configured Confluent
   * topic.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    options?: MonitorResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    options?: MonitorResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    options?: MonitorResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the Azure resource tags assigned to a monitor. */
  update: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    properties: MonitorResourceUpdateParameters,
    options?: MonitorResourcesUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitorResource>, MonitorResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    properties: MonitorResourceUpdateParameters,
    options?: MonitorResourcesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MonitorResource>, MonitorResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    properties: MonitorResourceUpdateParameters,
    options?: MonitorResourcesUpdateOptionalParams,
  ) => Promise<MonitorResource>;
  /**
   * Creates or replaces a monitor with the Confluent environment, cluster, and
   * topic to which selected Azure logs are sent.
   */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    resource: MonitorResource,
    options?: MonitorResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MonitorResource>, MonitorResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    resource: MonitorResource,
    options?: MonitorResourcesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MonitorResource>, MonitorResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    resource: MonitorResource,
    options?: MonitorResourcesCreateOrUpdateOptionalParams,
  ) => Promise<MonitorResource>;
  /** Gets a monitor and its configured Confluent log destination. */
  get: (
    resourceGroupName: string,
    organizationName: string,
    monitorName: string,
    options?: MonitorResourcesGetOptionalParams,
  ) => Promise<MonitorResource>;
}

function _getMonitorResources(context: ConfluentManagementContext) {
  return {
    listByOrganization: (
      resourceGroupName: string,
      organizationName: string,
      options?: MonitorResourcesListByOrganizationOptionalParams,
    ) => listByOrganization(context, resourceGroupName, organizationName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      options?: MonitorResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, monitorName, options),
    beginDelete: async (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      options?: MonitorResourcesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, organizationName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      options?: MonitorResourcesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, organizationName, monitorName, options);
    },
    update: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      properties: MonitorResourceUpdateParameters,
      options?: MonitorResourcesUpdateOptionalParams,
    ) => update(context, resourceGroupName, organizationName, monitorName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      properties: MonitorResourceUpdateParameters,
      options?: MonitorResourcesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        organizationName,
        monitorName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      properties: MonitorResourceUpdateParameters,
      options?: MonitorResourcesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        organizationName,
        monitorName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      resource: MonitorResource,
      options?: MonitorResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, organizationName, monitorName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      resource: MonitorResource,
      options?: MonitorResourcesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        monitorName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      resource: MonitorResource,
      options?: MonitorResourcesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        monitorName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      organizationName: string,
      monitorName: string,
      options?: MonitorResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, monitorName, options),
  };
}

export function _getMonitorResourcesOperations(
  context: ConfluentManagementContext,
): MonitorResourcesOperations {
  return {
    ..._getMonitorResources(context),
  };
}
