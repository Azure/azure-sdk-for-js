// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureFleetContext } from "../../api/azureFleetContext.js";
import { Fleet, FleetUpdate, VirtualMachineScaleSetListResult } from "../../models/models.js";
import {
  get,
  createOrUpdate,
  update,
  $delete,
  listByResourceGroup,
  listBySubscription,
  listVirtualMachineScaleSets,
} from "../../api/fleets/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
  ) => Promise<VirtualMachineScaleSetListResult>;
}

export function getFleets(context: AzureFleetContext, subscriptionId: string) {
  return {
    get: (resourceGroupName: string, fleetName: string, options?: FleetsGetOptionalParams) =>
      get(context, subscriptionId, resourceGroupName, fleetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, subscriptionId, resourceGroupName, fleetName, resource, options),
    update: (
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) => update(context, subscriptionId, resourceGroupName, fleetName, properties, options),
    delete: (resourceGroupName: string, fleetName: string, options?: FleetsDeleteOptionalParams) =>
      $delete(context, subscriptionId, resourceGroupName, fleetName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FleetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: FleetsListBySubscriptionOptionalParams) =>
      listBySubscription(context, subscriptionId, options),
    listVirtualMachineScaleSets: (
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachineScaleSetsOptionalParams,
    ) => listVirtualMachineScaleSets(context, subscriptionId, resourceGroupName, name, options),
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
