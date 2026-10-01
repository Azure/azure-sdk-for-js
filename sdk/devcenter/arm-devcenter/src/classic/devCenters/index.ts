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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    devCenterName: string,
    options?: DevCentersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    options?: DevCentersDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a devcenter. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenterUpdate,
    options?: DevCentersUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenter>, DevCenter>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenterUpdate,
    options?: DevCentersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DevCenter>, DevCenter>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenterUpdate,
    options?: DevCentersUpdateOptionalParams,
  ) => Promise<DevCenter>;
  /** Creates or updates a devcenter resource. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenter,
    options?: DevCentersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DevCenter>, DevCenter>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenter,
    options?: DevCentersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DevCenter>, DevCenter>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    body: DevCenter,
    options?: DevCentersCreateOrUpdateOptionalParams,
  ) => Promise<DevCenter>;
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
    beginDelete: async (
      resourceGroupName: string,
      devCenterName: string,
      options?: DevCentersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, devCenterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      options?: DevCentersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, devCenterName, options);
    },
    update: (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenterUpdate,
      options?: DevCentersUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenterUpdate,
      options?: DevCentersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, devCenterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenterUpdate,
      options?: DevCentersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, devCenterName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenter,
      options?: DevCentersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, devCenterName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenter,
      options?: DevCentersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, devCenterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      body: DevCenter,
      options?: DevCentersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, devCenterName, body, options);
    },
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
