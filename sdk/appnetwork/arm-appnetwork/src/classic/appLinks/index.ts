// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext } from "../../api/appLinkContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/appLinks/operations.js";
import type {
  AppLinksListBySubscriptionOptionalParams,
  AppLinksListByResourceGroupOptionalParams,
  AppLinksDeleteOptionalParams,
  AppLinksUpdateOptionalParams,
  AppLinksCreateOrUpdateOptionalParams,
  AppLinksGetOptionalParams,
} from "../../api/appLinks/options.js";
import type { AppLink, AppLinkUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
