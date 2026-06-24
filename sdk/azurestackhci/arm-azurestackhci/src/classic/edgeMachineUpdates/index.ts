// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/edgeMachineUpdates/operations.js";
import {
  EdgeMachineUpdatesListOptionalParams,
  EdgeMachineUpdatesDeleteOptionalParams,
  EdgeMachineUpdatesCreateOrUpdateOptionalParams,
  EdgeMachineUpdatesGetOptionalParams,
} from "../../api/edgeMachineUpdates/options.js";
import { EdgeMachineUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineUpdates operations. */
export interface EdgeMachineUpdatesOperations {
  /** List EdgeMachine update resources by EdgeMachine. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineUpdatesListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineUpdate>;
  /** Delete EdgeMachine update. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    options?: EdgeMachineUpdatesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    options?: EdgeMachineUpdatesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    options?: EdgeMachineUpdatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update EdgeMachine update. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    resource: EdgeMachineUpdate,
    options?: EdgeMachineUpdatesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineUpdate>, EdgeMachineUpdate>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    resource: EdgeMachineUpdate,
    options?: EdgeMachineUpdatesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineUpdate>, EdgeMachineUpdate>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    resource: EdgeMachineUpdate,
    options?: EdgeMachineUpdatesCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineUpdate>;
  /** Get EdgeMachine update. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    defaultParam: string,
    options?: EdgeMachineUpdatesGetOptionalParams,
  ) => Promise<EdgeMachineUpdate>;
}

function _getEdgeMachineUpdates(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineUpdatesListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      options?: EdgeMachineUpdatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, defaultParam, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      options?: EdgeMachineUpdatesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, defaultParam, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      options?: EdgeMachineUpdatesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, defaultParam, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      resource: EdgeMachineUpdate,
      options?: EdgeMachineUpdatesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, edgeMachineName, defaultParam, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      resource: EdgeMachineUpdate,
      options?: EdgeMachineUpdatesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        defaultParam,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      resource: EdgeMachineUpdate,
      options?: EdgeMachineUpdatesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        defaultParam,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      defaultParam: string,
      options?: EdgeMachineUpdatesGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, defaultParam, options),
  };
}

export function _getEdgeMachineUpdatesOperations(
  context: AzureStackHCIContext,
): EdgeMachineUpdatesOperations {
  return {
    ..._getEdgeMachineUpdates(context),
  };
}
