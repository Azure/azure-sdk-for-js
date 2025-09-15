// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetContext } from "../../api/azureFleetContext.js";
import {
  cancel,
  listVirtualMachines,
  listVirtualMachineScaleSets,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fleets/operations.js";
import {
  FleetsCancelOptionalParams,
  FleetsListVirtualMachinesOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsGetOptionalParams,
} from "../../api/fleets/options.js";
import { Fleet, FleetUpdate, VirtualMachineScaleSet, VirtualMachine } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Fleets operations. */
export interface FleetsOperations {
  /** Cancels an instance Fleet creation that is in progress. */
  cancel: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List VirtualMachine resources of an instance Fleet. */
  listVirtualMachines: (
    resourceGroupName: string,
    name: string,
    options?: FleetsListVirtualMachinesOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachine>;
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
    cancel: (resourceGroupName: string, fleetName: string, options?: FleetsCancelOptionalParams) =>
      cancel(context, resourceGroupName, fleetName, options),
    listVirtualMachines: (
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachinesOptionalParams,
    ) => listVirtualMachines(context, resourceGroupName, name, options),
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
