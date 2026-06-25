// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { $delete, createOrUpdate, list, get } from "../../api/edgeMachineGpus/operations.js";
import {
  EdgeMachineGpusDeleteOptionalParams,
  EdgeMachineGpusCreateOrUpdateOptionalParams,
  EdgeMachineGpusListOptionalParams,
  EdgeMachineGpusGetOptionalParams,
} from "../../api/edgeMachineGpus/options.js";
import { EdgeMachineGpu } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineGpus operations. */
export interface EdgeMachineGpusOperations {
  /** Delete a EdgeMachineGpu */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    options?: EdgeMachineGpusDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    options?: EdgeMachineGpusDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    options?: EdgeMachineGpusDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a GPU on an Edge Machine. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    resource: EdgeMachineGpu,
    options?: EdgeMachineGpusCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineGpu>, EdgeMachineGpu>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    resource: EdgeMachineGpu,
    options?: EdgeMachineGpusCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<EdgeMachineGpu>, EdgeMachineGpu>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    resource: EdgeMachineGpu,
    options?: EdgeMachineGpusCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineGpu>;
  /** List all GPUs on an Edge Machine. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineGpusListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineGpu>;
  /** Get a specific GPU on an Edge Machine. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    gpuName: string,
    options?: EdgeMachineGpusGetOptionalParams,
  ) => Promise<EdgeMachineGpu>;
}

function _getEdgeMachineGpus(context: AzureStackHCIContext) {
  return {
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      options?: EdgeMachineGpusDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, gpuName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      options?: EdgeMachineGpusDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, edgeMachineName, gpuName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      options?: EdgeMachineGpusDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, edgeMachineName, gpuName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      resource: EdgeMachineGpu,
      options?: EdgeMachineGpusCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, edgeMachineName, gpuName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      resource: EdgeMachineGpu,
      options?: EdgeMachineGpusCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      resource: EdgeMachineGpu,
      options?: EdgeMachineGpusCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        gpuName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineGpusListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      gpuName: string,
      options?: EdgeMachineGpusGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, gpuName, options),
  };
}

export function _getEdgeMachineGpusOperations(
  context: AzureStackHCIContext,
): EdgeMachineGpusOperations {
  return {
    ..._getEdgeMachineGpus(context),
  };
}
