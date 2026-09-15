// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FabricContext } from "../../api/fabricContext.js";
import {
  listUsages,
  listSkus,
  listSkusForCapacity,
  checkNameAvailability,
  suspend,
  resume,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fabricCapacities/operations.js";
import type {
  FabricCapacitiesListUsagesOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesGetOptionalParams,
} from "../../api/fabricCapacities/options.js";
import type {
  FabricCapacity,
  FabricCapacityUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  RpSkuDetailsForExistingResource,
  RpSkuDetailsForNewResource,
  Quota,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FabricCapacities operations. */
export interface FabricCapacitiesOperations {
  /** List the current consumption and limit in this location for the provided subscription */
  listUsages: (
    location: string,
    options?: FabricCapacitiesListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<Quota>;
  /** List eligible SKUs for Microsoft Fabric resource provider */
  listSkus: (
    options?: FabricCapacitiesListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<RpSkuDetailsForNewResource>;
  /** List eligible SKUs for a Microsoft Fabric resource */
  listSkusForCapacity: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesListSkusForCapacityOptionalParams,
  ) => PagedAsyncIterableIterator<RpSkuDetailsForExistingResource>;
  /** Implements local CheckNameAvailability operations */
  checkNameAvailability: (
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: FabricCapacitiesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Suspend operation of the specified Fabric capacity instance. */
  suspend: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesSuspendOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Resume operation of the specified Fabric capacity instance. */
  resume: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesResumeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List FabricCapacity resources by subscription ID */
  listBySubscription: (
    options?: FabricCapacitiesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FabricCapacity>;
  /** List FabricCapacity resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FabricCapacitiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FabricCapacity>;
  /** Delete a FabricCapacity */
  delete: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a FabricCapacity */
  update: (
    resourceGroupName: string,
    capacityName: string,
    properties: FabricCapacityUpdate,
    options?: FabricCapacitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
  /** Create a FabricCapacity */
  createOrUpdate: (
    resourceGroupName: string,
    capacityName: string,
    resource: FabricCapacity,
    options?: FabricCapacitiesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
  /** Get a FabricCapacity */
  get: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesGetOptionalParams,
  ) => Promise<FabricCapacity>;
}
function _getFabricCapacities(context: FabricContext) {
  return {
    listUsages: (location: string, options?: FabricCapacitiesListUsagesOptionalParams) =>
      listUsages(context, location, options),
    listSkus: (options?: FabricCapacitiesListSkusOptionalParams) => listSkus(context, options),
    listSkusForCapacity: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesListSkusForCapacityOptionalParams,
    ) => listSkusForCapacity(context, resourceGroupName, capacityName, options),
    checkNameAvailability: (
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: FabricCapacitiesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, body, options),
    suspend: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, capacityName, options),
    resume: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesResumeOptionalParams,
    ) => resume(context, resourceGroupName, capacityName, options),
    listBySubscription: (options?: FabricCapacitiesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FabricCapacitiesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, capacityName, options),
    update: (
      resourceGroupName: string,
      capacityName: string,
      properties: FabricCapacityUpdate,
      options?: FabricCapacitiesUpdateOptionalParams,
    ) => update(context, resourceGroupName, capacityName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      capacityName: string,
      resource: FabricCapacity,
      options?: FabricCapacitiesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, capacityName, resource, options),
    get: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesGetOptionalParams,
    ) => get(context, resourceGroupName, capacityName, options),
  };
}
export function _getFabricCapacitiesOperations(context: FabricContext): FabricCapacitiesOperations {
  return {
    ..._getFabricCapacities(context),
  };
}
