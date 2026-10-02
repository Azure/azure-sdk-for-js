// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  virtualMachinesGetOperationStatus,
  cancel,
  $delete,
  createOrUpdate,
  getAsyncOperationStatus,
  get,
} from "../../api/bulkCreate/operations.js";
import type {
  BulkCreateListBySubscriptionOptionalParams,
  BulkCreateListByResourceGroupOptionalParams,
  BulkCreateVirtualMachinesGetOperationStatusOptionalParams,
  BulkCreateCancelOptionalParams,
  BulkCreateDeleteOptionalParams,
  BulkCreateCreateOrUpdateOptionalParams,
  BulkCreateGetAsyncOperationStatusOptionalParams,
  BulkCreateGetOptionalParams,
} from "../../api/bulkCreate/options.js";
import type {
  ResourceOperation,
  OperationStatusResult,
  LocationBasedBulkCreate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BulkCreate operations. */
export interface BulkCreateOperations {
  /** List BulkCreate resources by subscriptionId. */
  listBySubscription: (
    location: string,
    options?: BulkCreateListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedBulkCreate>;
  /** List BulkCreate resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: BulkCreateListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LocationBasedBulkCreate>;
  /** Gets the operation status for virtual machines in a BulkCreate operation. */
  virtualMachinesGetOperationStatus: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateVirtualMachinesGetOperationStatusOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceOperation>;
  /** Cancels BulkCreate instances that have not yet launched. */
  cancel: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deletes BulkCreates. */
  delete: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates BulkCreates. */
  createOrUpdate: (
    resourceGroupName: string,
    location: string,
    name: string,
    resource: LocationBasedBulkCreate,
    options?: BulkCreateCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LocationBasedBulkCreate>, LocationBasedBulkCreate>;
  /** Get the status of an async operation of a BulkCreate. */
  getAsyncOperationStatus: (
    location: string,
    asyncOperationId: string,
    options?: BulkCreateGetAsyncOperationStatusOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Gets an instance of BulkCreates. */
  get: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateGetOptionalParams,
  ) => Promise<LocationBasedBulkCreate>;
}

function _getBulkCreate(context: ComputeContext) {
  return {
    listBySubscription: (location: string, options?: BulkCreateListBySubscriptionOptionalParams) =>
      listBySubscription(context, location, options),
    listByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: BulkCreateListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, location, options),
    virtualMachinesGetOperationStatus: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateVirtualMachinesGetOperationStatusOptionalParams,
    ) => virtualMachinesGetOperationStatus(context, resourceGroupName, location, name, options),
    cancel: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateCancelOptionalParams,
    ) => cancel(context, resourceGroupName, location, name, options),
    delete: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, location, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      location: string,
      name: string,
      resource: LocationBasedBulkCreate,
      options?: BulkCreateCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, location, name, resource, options),
    getAsyncOperationStatus: (
      location: string,
      asyncOperationId: string,
      options?: BulkCreateGetAsyncOperationStatusOptionalParams,
    ) => getAsyncOperationStatus(context, location, asyncOperationId, options),
    get: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateGetOptionalParams,
    ) => get(context, resourceGroupName, location, name, options),
  };
}

export function _getBulkCreateOperations(context: ComputeContext): BulkCreateOperations {
  return {
    ..._getBulkCreate(context),
  };
}
