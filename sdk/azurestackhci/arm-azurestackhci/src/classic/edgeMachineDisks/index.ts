// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { $delete, createOrUpdate, list, get } from "../../api/edgeMachineDisks/operations.js";
import {
  EdgeMachineDisksDeleteOptionalParams,
  EdgeMachineDisksCreateOrUpdateOptionalParams,
  EdgeMachineDisksListOptionalParams,
  EdgeMachineDisksGetOptionalParams,
} from "../../api/edgeMachineDisks/options.js";
import { EdgeMachineDisk } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineDisks operations. */
export interface EdgeMachineDisksOperations {
  /** Delete a disk from an Edge Machine. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    options?: EdgeMachineDisksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    options?: EdgeMachineDisksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    options?: EdgeMachineDisksDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a disk on an Edge Machine. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    resource: EdgeMachineDisk,
    options?: EdgeMachineDisksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineDisk>, EdgeMachineDisk>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    resource: EdgeMachineDisk,
    options?: EdgeMachineDisksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineDisk>, EdgeMachineDisk>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    resource: EdgeMachineDisk,
    options?: EdgeMachineDisksCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineDisk>;
  /** List all disks on an Edge Machine. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineDisksListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineDisk>;
  /** Get a specific disk on an Edge Machine. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    diskName: string,
    options?: EdgeMachineDisksGetOptionalParams,
  ) => Promise<EdgeMachineDisk>;
}

function _getEdgeMachineDisks(context: AzureStackHCIContext) {
  return {
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      options?: EdgeMachineDisksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, diskName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      options?: EdgeMachineDisksDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, diskName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      options?: EdgeMachineDisksDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, diskName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      resource: EdgeMachineDisk,
      options?: EdgeMachineDisksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, diskName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      resource: EdgeMachineDisk,
      options?: EdgeMachineDisksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      resource: EdgeMachineDisk,
      options?: EdgeMachineDisksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        diskName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineDisksListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      diskName: string,
      options?: EdgeMachineDisksGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, diskName, options),
  };
}

export function _getEdgeMachineDisksOperations(
  context: AzureStackHCIContext,
): EdgeMachineDisksOperations {
  return {
    ..._getEdgeMachineDisks(context),
  };
}
