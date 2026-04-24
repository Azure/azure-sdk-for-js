// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/edgeMachines/operations.js";
import type {
  EdgeMachinesListBySubscriptionOptionalParams,
  EdgeMachinesListByResourceGroupOptionalParams,
  EdgeMachinesDeleteOptionalParams,
  EdgeMachinesUpdateOptionalParams,
  EdgeMachinesCreateOrUpdateOptionalParams,
  EdgeMachinesGetOptionalParams,
} from "../../api/edgeMachines/options.js";
import type { EdgeMachine, EdgeMachinePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachinesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an edge machine. */
  update: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachine>, EdgeMachine>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachine>, EdgeMachine>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    properties: EdgeMachinePatch,
    options?: EdgeMachinesUpdateOptionalParams,
  ) => Promise<EdgeMachine>;
  /** Create or update an edge machine. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachine>, EdgeMachine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachine>, EdgeMachine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    resource: EdgeMachine,
    options?: EdgeMachinesCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachine>;
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
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, options);
    },
    update: (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, edgeMachineName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, edgeMachineName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      properties: EdgeMachinePatch,
      options?: EdgeMachinesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, edgeMachineName, properties, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      resource: EdgeMachine,
      options?: EdgeMachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, edgeMachineName, resource, options);
    },
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
