// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetContext } from "../../api/azureFleetContext.js";
import {
  Fleet,
  FleetUpdate,
  VirtualMachineScaleSet,
} from "../../models/models.js";
import {
  fleetsGet,
  fleetsCreateOrUpdate,
  fleetsUpdate,
  fleetsDelete,
  fleetsListByResourceGroup,
  fleetsListBySubscription,
  fleetsListVirtualMachineScaleSets,
} from "../../api/fleets/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FleetsGetOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
} from "../../models/options.js";

/** Interface representing a Fleets operations. */
export interface FleetsOperations {
  /** Get a Fleet */
  get: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsGetOptionalParams,
  ) => Promise<Fleet>;
  /** Create a Fleet */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    resource: Fleet,
    options?: FleetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** Update a Fleet */
  update: (
    resourceGroupName: string,
    fleetName: string,
    properties: FleetUpdate,
    options?: FleetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** Delete a Fleet */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Fleet resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FleetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
  /** List Fleet resources by subscription ID */
  listBySubscription: (
    options?: FleetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
  /** List VirtualMachineScaleSet resources by Fleet */
  listVirtualMachineScaleSets: (
    resourceGroupName: string,
    name: string,
    options?: FleetsListVirtualMachineScaleSetsOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
}

export function getFleets(context: AzureFleetContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsGetOptionalParams,
    ) =>
      fleetsGet(context, subscriptionId, resourceGroupName, fleetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) =>
      fleetsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) =>
      fleetsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsDeleteOptionalParams,
    ) =>
      fleetsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FleetsListByResourceGroupOptionalParams,
    ) =>
      fleetsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (options?: FleetsListBySubscriptionOptionalParams) =>
      fleetsListBySubscription(context, subscriptionId, options),
    listVirtualMachineScaleSets: (
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachineScaleSetsOptionalParams,
    ) =>
      fleetsListVirtualMachineScaleSets(
        context,
        subscriptionId,
        resourceGroupName,
        name,
        options,
      ),
  };
}

export function getFleetsOperations(
  context: AzureFleetContext,
  subscriptionId: string,
): FleetsOperations {
  return {
    ...getFleets(context, subscriptionId),
  };
}
