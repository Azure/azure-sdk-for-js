// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/edgeMachines/operations.js";
import {
  EdgeMachinesListBySubscriptionOptionalParams,
  EdgeMachinesListByResourceGroupOptionalParams,
  EdgeMachinesDeleteOptionalParams,
  EdgeMachinesUpdateOptionalParams,
  EdgeMachinesCreateOrUpdateOptionalParams,
  EdgeMachinesGetOptionalParams,
} from "../../api/edgeMachines/options.js";
import { EdgeMachine, EdgeMachinePatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachines operations. */
export interface EdgeMachinesOperations {
  /** List all edge machines in a subscription. */
  listBySubscription: (
    options?: EdgeMachinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachine>;
  /** List all edge machines in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EdgeMachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachine>;
  /** Delete an edge machine. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an edge machine. */
  update: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachine>, EdgeMachine>;
  /** Create or update an edge machine. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachine>, EdgeMachine>;
  /** Get an edge machine. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesGetOptionalParams,
  ) => Promise<EdgeMachine>;
}

function _getEdgeMachines(context: AzureStackHCIContext) {
  return {
    listBySubscription: (options?: EdgeMachinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EdgeMachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, options),
    update: (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeMachineName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, options),
  };
}

export function _getEdgeMachinesOperations(context: AzureStackHCIContext): EdgeMachinesOperations {
  return {
    ..._getEdgeMachines(context),
  };
}
