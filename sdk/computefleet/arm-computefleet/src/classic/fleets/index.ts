// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetContext } from "../../api/azureFleetContext.js";
import { Fleet, FleetUpdate, VirtualMachineScaleSet } from "../../models/models.js";
import {
  FleetsListVirtualMachineScaleSetsOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsGetOptionalParams,
} from "../../api/fleets/options.js";
import {
  listVirtualMachineScaleSets,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fleets/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fleets operations. */
export interface FleetsOperations {
  /** List VirtualMachineScaleSet resources by Fleet */
  listVirtualMachineScaleSets: (
    resourceGroupName: string,
    name: string,
    options?: FleetsListVirtualMachineScaleSetsOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /** List Fleet resources by subscription ID */
  listBySubscription: (
    options?: FleetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
  /** List Fleet resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FleetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
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
  /** Update a Fleet */
  update: (
    resourceGroupName: string,
    fleetName: string,
    properties: FleetUpdate,
    options?: FleetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** Create a Fleet */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    resource: Fleet,
    options?: FleetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** Get a Fleet */
  get: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsGetOptionalParams,
  ) => Promise<Fleet>;
}

function _getFleets(context: AzureFleetContext) {
  return {
    listVirtualMachineScaleSets: (
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachineScaleSetsOptionalParams,
    ) => listVirtualMachineScaleSets(context, resourceGroupName, name, options),
    listBySubscription: (options?: FleetsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FleetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, fleetName: string, options?: FleetsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, fleetName, options),
    update: (
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, fleetName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, fleetName, resource, options),
    get: (resourceGroupName: string, fleetName: string, options?: FleetsGetOptionalParams) =>
      get(context, resourceGroupName, fleetName, options),
  };
}

export function _getFleetsOperations(context: AzureFleetContext): FleetsOperations {
  return {
    ..._getFleets(context),
  };
}
