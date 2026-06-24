// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { $delete, createOrUpdate, list, get } from "../../api/edgeMachineVolumes/operations.js";
import {
  EdgeMachineVolumesDeleteOptionalParams,
  EdgeMachineVolumesCreateOrUpdateOptionalParams,
  EdgeMachineVolumesListOptionalParams,
  EdgeMachineVolumesGetOptionalParams,
} from "../../api/edgeMachineVolumes/options.js";
import { EdgeMachineVolume } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineVolumes operations. */
export interface EdgeMachineVolumesOperations {
  /** Delete a volume from an Edge Machine. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    options?: EdgeMachineVolumesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    options?: EdgeMachineVolumesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    options?: EdgeMachineVolumesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a volume on an Edge Machine. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    resource: EdgeMachineVolume,
    options?: EdgeMachineVolumesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineVolume>, EdgeMachineVolume>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    resource: EdgeMachineVolume,
    options?: EdgeMachineVolumesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineVolume>, EdgeMachineVolume>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    resource: EdgeMachineVolume,
    options?: EdgeMachineVolumesCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineVolume>;
  /** List all volumes on an Edge Machine. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineVolumesListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineVolume>;
  /** Get a specific volume on an Edge Machine. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    volumeName: string,
    options?: EdgeMachineVolumesGetOptionalParams,
  ) => Promise<EdgeMachineVolume>;
}

function _getEdgeMachineVolumes(context: AzureStackHCIContext) {
  return {
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      options?: EdgeMachineVolumesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, volumeName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      options?: EdgeMachineVolumesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, volumeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      options?: EdgeMachineVolumesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, volumeName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      resource: EdgeMachineVolume,
      options?: EdgeMachineVolumesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, volumeName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      resource: EdgeMachineVolume,
      options?: EdgeMachineVolumesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        volumeName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      resource: EdgeMachineVolume,
      options?: EdgeMachineVolumesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        volumeName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineVolumesListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      volumeName: string,
      options?: EdgeMachineVolumesGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, volumeName, options),
  };
}

export function _getEdgeMachineVolumesOperations(
  context: AzureStackHCIContext,
): EdgeMachineVolumesOperations {
  return {
    ..._getEdgeMachineVolumes(context),
  };
}
