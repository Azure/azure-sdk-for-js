// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkContext } from "../../api/appLinkContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/appLinks/operations.js";
import {
  AppLinksListBySubscriptionOptionalParams,
  AppLinksListByResourceGroupOptionalParams,
  AppLinksDeleteOptionalParams,
  AppLinksUpdateOptionalParams,
  AppLinksCreateOrUpdateOptionalParams,
  AppLinksGetOptionalParams,
} from "../../api/appLinks/options.js";
import { AppLink, AppLinkUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AppLinks operations. */
export interface AppLinksOperations {
  /** List AppLink resources by subscription. */
  listBySubscription: (
    options?: AppLinksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AppLink>;
  /** List AppLink resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AppLinksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AppLink>;
  /** Delete an AppLink. */
  delete: (
    resourceGroupName: string,
    appLinkName: string,
    options?: AppLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an AppLink. */
  update: (
    resourceGroupName: string,
    appLinkName: string,
    properties: AppLinkUpdate,
    options?: AppLinksUpdateOptionalParams,
  ) => PollerLike<OperationState<AppLink>, AppLink>;
  /** Create an AppLink. */
  createOrUpdate: (
    resourceGroupName: string,
    appLinkName: string,
    resource: AppLink,
    options?: AppLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AppLink>, AppLink>;
  /** Get an AppLink. */
  get: (
    resourceGroupName: string,
    appLinkName: string,
    options?: AppLinksGetOptionalParams,
  ) => Promise<AppLink>;
}

function _getAppLinks(context: AppLinkContext) {
  return {
    listBySubscription: (options?: AppLinksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AppLinksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      appLinkName: string,
      options?: AppLinksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, appLinkName, options),
    update: (
      resourceGroupName: string,
      appLinkName: string,
      properties: AppLinkUpdate,
      options?: AppLinksUpdateOptionalParams,
    ) => update(context, resourceGroupName, appLinkName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      appLinkName: string,
      resource: AppLink,
      options?: AppLinksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, appLinkName, resource, options),
    get: (resourceGroupName: string, appLinkName: string, options?: AppLinksGetOptionalParams) =>
      get(context, resourceGroupName, appLinkName, options),
  };
}

export function _getAppLinksOperations(context: AppLinkContext): AppLinksOperations {
  return {
    ..._getAppLinks(context),
  };
}
