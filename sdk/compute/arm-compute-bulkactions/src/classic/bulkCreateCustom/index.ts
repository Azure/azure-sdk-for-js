// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  cancel,
  $delete,
  createOrUpdate,
  getAsyncOperationStatus,
  get,
} from "../../api/bulkCreateCustom/operations.js";
import type {
  BulkCreateCustomListBySubscriptionOptionalParams,
  BulkCreateCustomListByResourceGroupOptionalParams,
  BulkCreateCustomCancelOptionalParams,
  BulkCreateCustomDeleteOptionalParams,
  BulkCreateCustomCreateOrUpdateOptionalParams,
  BulkCreateCustomGetAsyncOperationStatusOptionalParams,
  BulkCreateCustomGetOptionalParams,
} from "../../api/bulkCreateCustom/options.js";
import type { OperationStatusResult, LocationBasedBulkCreateCustom } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BulkCreateCustom operations. */
export interface BulkCreateCustomOperations {
  /** List BulkCreateCustom resources by subscriptionId. */
  listBySubscription: (
    location: string,
    options?: BulkCreateCustomListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedBulkCreateCustom>;
  /** List BulkCreateCustom resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: BulkCreateCustomListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedBulkCreateCustom>;
  /** Cancels BulkCreateCustom instances that have not yet launched. */
  cancel: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateCustomCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deletes BulkCreateCustoms. */
  delete: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateCustomDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates BulkCreateCustoms. */
  createOrUpdate: (
    resourceGroupName: string,
    location: string,
    name: string,
    resource: LocationBasedBulkCreateCustom,
    options?: BulkCreateCustomCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LocationBasedBulkCreateCustom>, LocationBasedBulkCreateCustom>;
  /** Get the status of an async operation of a BulkCreateCustom. */
  getAsyncOperationStatus: (
    location: string,
    asyncOperationId: string,
    options?: BulkCreateCustomGetAsyncOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Gets an instance of BulkCreateCustoms. */
  get: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateCustomGetOptionalParams,
  ) => Promise<LocationBasedBulkCreateCustom>;
}
function _getBulkCreateCustom(context: ComputeContext) {
  return {
    listBySubscription: (
      location: string,
      options?: BulkCreateCustomListBySubscriptionOptionalParams,
    ) => listBySubscription(context, location, options),
    listByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: BulkCreateCustomListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, location, options),
    cancel: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateCustomCancelOptionalParams,
    ) => cancel(context, resourceGroupName, location, name, options),
    delete: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateCustomDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, location, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      location: string,
      name: string,
      resource: LocationBasedBulkCreateCustom,
      options?: BulkCreateCustomCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, location, name, resource, options),
    getAsyncOperationStatus: (
      location: string,
      asyncOperationId: string,
      options?: BulkCreateCustomGetAsyncOperationStatusOptionalParams,
    ) => getAsyncOperationStatus(context, location, asyncOperationId, options),
    get: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateCustomGetOptionalParams,
    ) => get(context, resourceGroupName, location, name, options),
  };
}
export function _getBulkCreateCustomOperations(
  context: ComputeContext,
): BulkCreateCustomOperations {
  return {
    ..._getBulkCreateCustom(context),
  };
}
