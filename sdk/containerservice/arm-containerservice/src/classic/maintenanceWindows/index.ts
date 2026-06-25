// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listBySubscription,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/maintenanceWindows/operations.js";
import {
  MaintenanceWindowsListBySubscriptionOptionalParams,
  MaintenanceWindowsListOptionalParams,
  MaintenanceWindowsDeleteOptionalParams,
  MaintenanceWindowsUpdateTagsOptionalParams,
  MaintenanceWindowsCreateOrUpdateOptionalParams,
  MaintenanceWindowsGetOptionalParams,
} from "../../api/maintenanceWindows/options.js";
import { TagsObject, MaintenanceWindowResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MaintenanceWindows operations. */
export interface MaintenanceWindowsOperations {
  /** Lists maintenance windows in the specified subscription. */
  listBySubscription: (
    options?: MaintenanceWindowsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceWindowResource>;
  /** Lists maintenance windows in the specified resource group. */
  list: (
    resourceGroupName: string,
    options?: MaintenanceWindowsListOptionalParams,
  ) => PagedAsyncIterableIterator<MaintenanceWindowResource>;
  /** Deletes a maintenance window. */
  delete: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags on a maintenance window. */
  updateTags: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    properties: TagsObject,
    options?: MaintenanceWindowsUpdateTagsOptionalParams,
  ) => Promise<MaintenanceWindowResource>;
  /** Creates or updates a maintenance window. */
  createOrUpdate: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    resource: MaintenanceWindowResource,
    options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MaintenanceWindowResource>, MaintenanceWindowResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    resource: MaintenanceWindowResource,
    options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MaintenanceWindowResource>, MaintenanceWindowResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    resource: MaintenanceWindowResource,
    options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
  ) => Promise<MaintenanceWindowResource>;
  /** Gets the specified maintenance window. */
  get: (
    resourceGroupName: string,
    maintenanceWindowName: string,
    options?: MaintenanceWindowsGetOptionalParams,
  ) => Promise<MaintenanceWindowResource>;
}

function _getMaintenanceWindows(context: ContainerServiceContext) {
  return {
    listBySubscription: (options?: MaintenanceWindowsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: MaintenanceWindowsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      maintenanceWindowName: string,
      options?: MaintenanceWindowsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, maintenanceWindowName, options),
    beginDelete: async (
      resourceGroupName: string,
      maintenanceWindowName: string,
      options?: MaintenanceWindowsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, maintenanceWindowName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      maintenanceWindowName: string,
      options?: MaintenanceWindowsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, maintenanceWindowName, options);
    },
    updateTags: (
      resourceGroupName: string,
      maintenanceWindowName: string,
      properties: TagsObject,
      options?: MaintenanceWindowsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, maintenanceWindowName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      maintenanceWindowName: string,
      resource: MaintenanceWindowResource,
      options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, maintenanceWindowName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      maintenanceWindowName: string,
      resource: MaintenanceWindowResource,
      options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        maintenanceWindowName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      maintenanceWindowName: string,
      resource: MaintenanceWindowResource,
      options?: MaintenanceWindowsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        maintenanceWindowName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      maintenanceWindowName: string,
      options?: MaintenanceWindowsGetOptionalParams,
    ) => get(context, resourceGroupName, maintenanceWindowName, options),
  };
}

export function _getMaintenanceWindowsOperations(
  context: ContainerServiceContext,
): MaintenanceWindowsOperations {
  return {
    ..._getMaintenanceWindows(context),
  };
}
