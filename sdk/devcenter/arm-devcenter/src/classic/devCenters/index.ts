// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/devCenters/operations.js";
import type {
  DevCentersListBySubscriptionOptionalParams,
  DevCentersListByResourceGroupOptionalParams,
  DevCentersDeleteOptionalParams,
  DevCentersUpdateOptionalParams,
  DevCentersCreateOrUpdateOptionalParams,
  DevCentersGetOptionalParams,
} from "../../api/devCenters/options.js";
import type { DevCenter, DevCenterUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DevCenters operations. */
export interface DevCentersOperations {
  /** Lists all devcenters in a subscription. */
  listBySubscription: (
    options?: DevCentersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DevCenter>;
  /** Lists all devcenters in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DevCentersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DevCenter>;
  /** Deletes a devcenter. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    options?: DevCentersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates a devcenter. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenterUpdate,
    options?: DevCentersUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenter>, DevCenter>;
  /** Creates or updates a devcenter resource. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenter,
    options?: DevCentersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenter>, DevCenter>;
  /** Gets a devcenter. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    options?: DevCentersGetOptionalParams,
  ) => Promise<DevCenter>;
}

function _getDevCenters(context: DevCenterContext) {
  return {
    listBySubscription: (options?: DevCentersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DevCentersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      options?: DevCentersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, options),
    update: (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenterUpdate,
      options?: DevCentersUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenter,
      options?: DevCentersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, devCenterName, body, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      options?: DevCentersGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, options),
  };
}

export function _getDevCentersOperations(context: DevCenterContext): DevCentersOperations {
  return {
    ..._getDevCenters(context),
  };
}
