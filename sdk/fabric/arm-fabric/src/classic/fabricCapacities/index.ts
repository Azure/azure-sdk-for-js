// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FabricContext } from "../../api/fabricContext.js";
import {
  FabricCapacity,
  FabricCapacityUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  RpSkuDetailsForExistingResource,
  RpSkuDetailsForNewResource,
} from "../../models/models.js";
import {
  fabricCapacitiesGet,
  fabricCapacitiesCreateOrUpdate,
  fabricCapacitiesUpdate,
  fabricCapacitiesDelete,
  fabricCapacitiesListByResourceGroup,
  fabricCapacitiesListBySubscription,
  fabricCapacitiesResume,
  fabricCapacitiesSuspend,
  fabricCapacitiesCheckNameAvailability,
  fabricCapacitiesListSkusForCapacity,
  fabricCapacitiesListSkus,
} from "../../api/fabricCapacities/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FabricCapacitiesGetOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
} from "../../models/options.js";

/** Interface representing a FabricCapacities operations. */
export interface FabricCapacitiesOperations {
  /** Get a FabricCapacity */
  get: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesGetOptionalParams,
  ) => Promise<FabricCapacity>;
  /** Create a FabricCapacity */
  createOrUpdate: (
    resourceGroupName: string,
    capacityName: string,
    resource: FabricCapacity,
    options?: FabricCapacitiesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
  /** Update a FabricCapacity */
  update: (
    resourceGroupName: string,
    capacityName: string,
    properties: FabricCapacityUpdate,
    options?: FabricCapacitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
  /** Delete a FabricCapacity */
  delete: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List FabricCapacity resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FabricCapacitiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FabricCapacity>;
  /** List FabricCapacity resources by subscription ID */
  listBySubscription: (
    options?: FabricCapacitiesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FabricCapacity>;
  /** Resume operation of the specified Fabric capacity instance. */
  resume: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesResumeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Suspend operation of the specified Fabric capacity instance. */
  suspend: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesSuspendOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Implements local CheckNameAvailability operations */
  checkNameAvailability: (
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: FabricCapacitiesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** List eligible SKUs for a Microsoft Fabric resource */
  listSkusForCapacity: (
    resourceGroupName: string,
    capacityName: string,
    options?: FabricCapacitiesListSkusForCapacityOptionalParams,
  ) => PagedAsyncIterableIterator<RpSkuDetailsForExistingResource>;
  /** List eligible SKUs for Microsoft Fabric resource provider */
  listSkus: (
    options?: FabricCapacitiesListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<RpSkuDetailsForNewResource>;
}

export function getFabricCapacities(
  context: FabricContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesGetOptionalParams,
    ) =>
      fabricCapacitiesGet(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      capacityName: string,
      resource: FabricCapacity,
      options?: FabricCapacitiesCreateOrUpdateOptionalParams,
    ) =>
      fabricCapacitiesCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      capacityName: string,
      properties: FabricCapacityUpdate,
      options?: FabricCapacitiesUpdateOptionalParams,
    ) =>
      fabricCapacitiesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesDeleteOptionalParams,
    ) =>
      fabricCapacitiesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FabricCapacitiesListByResourceGroupOptionalParams,
    ) =>
      fabricCapacitiesListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: FabricCapacitiesListBySubscriptionOptionalParams,
    ) => fabricCapacitiesListBySubscription(context, subscriptionId, options),
    resume: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesResumeOptionalParams,
    ) =>
      fabricCapacitiesResume(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    suspend: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesSuspendOptionalParams,
    ) =>
      fabricCapacitiesSuspend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    checkNameAvailability: (
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: FabricCapacitiesCheckNameAvailabilityOptionalParams,
    ) =>
      fabricCapacitiesCheckNameAvailability(
        context,
        subscriptionId,
        location,
        body,
        options,
      ),
    listSkusForCapacity: (
      resourceGroupName: string,
      capacityName: string,
      options?: FabricCapacitiesListSkusForCapacityOptionalParams,
    ) =>
      fabricCapacitiesListSkusForCapacity(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    listSkus: (options?: FabricCapacitiesListSkusOptionalParams) =>
      fabricCapacitiesListSkus(context, subscriptionId, options),
  };
}

export function getFabricCapacitiesOperations(
  context: FabricContext,
  subscriptionId: string,
): FabricCapacitiesOperations {
  return {
    ...getFabricCapacities(context, subscriptionId),
  };
}
