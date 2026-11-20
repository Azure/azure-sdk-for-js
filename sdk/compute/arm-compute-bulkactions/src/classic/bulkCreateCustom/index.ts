// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  virtualMachinesGetOperationStatus,
  create,
  getAsyncOperationStatus,
  get,
} from "../../api/bulkCreateCustom/operations.js";
import type {
  BulkCreateCustomListBySubscriptionOptionalParams,
  BulkCreateCustomListByResourceGroupOptionalParams,
  BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams,
  BulkCreateCustomCreateOptionalParams,
  BulkCreateCustomGetAsyncOperationStatusOptionalParams,
  BulkCreateCustomGetOptionalParams,
} from "../../api/bulkCreateCustom/options.js";
import type {
  ResourceOperation,
  LocationBasedBulkCreateCustom,
  OperationStatusResult,
} from "../../models/models.js";
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
  /** Gets the operation status for virtual machines in a BulkCreateCustom operation. */
  virtualMachinesGetOperationStatus: (
    resourceGroupName: string,
    location: string,
    name: string,
    options?: BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceOperation>;
  /** Creates virtual machines in bulk with custom settings. */
  create: (
    resourceGroupName: string,
    location: string,
    name: string,
    resource: LocationBasedBulkCreateCustom,
    options?: BulkCreateCustomCreateOptionalParams,
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
    virtualMachinesGetOperationStatus: (
      resourceGroupName: string,
      location: string,
      name: string,
      options?: BulkCreateCustomVirtualMachinesGetOperationStatusOptionalParams,
    ) => virtualMachinesGetOperationStatus(context, resourceGroupName, location, name, options),
    create: (
      resourceGroupName: string,
      location: string,
      name: string,
      resource: LocationBasedBulkCreateCustom,
      options?: BulkCreateCustomCreateOptionalParams,
    ) => create(context, resourceGroupName, location, name, resource, options),
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
