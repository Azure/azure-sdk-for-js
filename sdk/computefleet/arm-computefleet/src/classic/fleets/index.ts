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
    apiVersion: string,
    resourceGroupName: string,
    name: string,
    options?: FleetsListVirtualMachineScaleSetsOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualMachineScaleSet>;
  /** List Fleet resources by subscription ID */
  listBySubscription: (
    apiVersion: string,
    options?: FleetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Fleet>;
  /** List Fleet resources by resource group */
  listByResourceGroup: (
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Fleet */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    fleetName: string,
    properties: FleetUpdate,
    options?: FleetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** Create a Fleet */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    fleetName: string,
    resource: Fleet,
    options?: FleetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Fleet>, Fleet>;
  /** Get a Fleet */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    fleetName: string,
    options?: FleetsGetOptionalParams,
  ) => Promise<Fleet>;
}

function _getFleets(context: AzureFleetContext) {
  return {
    listVirtualMachineScaleSets: (
      apiVersion: string,
      resourceGroupName: string,
      name: string,
      options?: FleetsListVirtualMachineScaleSetsOptionalParams,
    ) => listVirtualMachineScaleSets(context, apiVersion, resourceGroupName, name, options),
    listBySubscription: (apiVersion: string, options?: FleetsListBySubscriptionOptionalParams) =>
      listBySubscription(context, apiVersion, options),
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      options?: FleetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, fleetName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      fleetName: string,
      properties: FleetUpdate,
      options?: FleetsUpdateOptionalParams,
    ) => update(context, apiVersion, resourceGroupName, fleetName, properties, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      fleetName: string,
      resource: Fleet,
      options?: FleetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, apiVersion, resourceGroupName, fleetName, resource, options),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      fleetName: string,
      options?: FleetsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, fleetName, options),
  };
}

export function _getFleetsOperations(context: AzureFleetContext): FleetsOperations {
  return {
    ..._getFleets(context),
  };
}
