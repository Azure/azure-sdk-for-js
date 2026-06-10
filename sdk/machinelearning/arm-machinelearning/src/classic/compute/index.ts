// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  resize,
  getAllowedResizeSizes,
  updateIdleShutdownSetting,
  restart,
  stop,
  start,
  updateDataMounts,
  listKeys,
  listNodes,
  updateCustomServices,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/compute/operations.js";
import type {
  ComputeResizeOptionalParams,
  ComputeGetAllowedResizeSizesOptionalParams,
  ComputeUpdateIdleShutdownSettingOptionalParams,
  ComputeRestartOptionalParams,
  ComputeStopOptionalParams,
  ComputeStartOptionalParams,
  ComputeUpdateDataMountsOptionalParams,
  ComputeListKeysOptionalParams,
  ComputeListNodesOptionalParams,
  ComputeUpdateCustomServicesOptionalParams,
  ComputeListOptionalParams,
  ComputeDeleteOptionalParams,
  ComputeUpdateOptionalParams,
  ComputeCreateOrUpdateOptionalParams,
  ComputeGetOptionalParams,
} from "../../api/compute/options.js";
import type {
  ComputeResource,
  CustomService,
  ComputeInstanceDataMount,
  ClusterUpdateParameters,
  AmlComputeNodeInformation,
  ComputeSecretsUnion,
  IdleShutdownSetting,
  VirtualMachineSizeListResult,
  ResizeSchema,
  UnderlyingResourceAction,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Compute operations. */
export interface ComputeOperations {
  /** Updates the size of a Compute Instance. */
  resize: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ResizeSchema,
    options?: ComputeResizeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resize instead */
  beginResize: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ResizeSchema,
    options?: ComputeResizeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resize instead */
  beginResizeAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ResizeSchema,
    options?: ComputeResizeOptionalParams,
  ) => Promise<void>;
  /** Returns supported virtual machine sizes for resize. */
  getAllowedResizeSizes: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeGetAllowedResizeSizesOptionalParams,
  ) => Promise<VirtualMachineSizeListResult>;
  /** Updates the idle shutdown setting of a compute instance. */
  updateIdleShutdownSetting: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: IdleShutdownSetting,
    options?: ComputeUpdateIdleShutdownSettingOptionalParams,
  ) => Promise<void>;
  /** Posts a restart action to a compute instance */
  restart: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeRestartOptionalParams,
  ) => Promise<void>;
  /** Posts a stop action to a compute instance */
  stop: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStopOptionalParams,
  ) => Promise<void>;
  /** Posts a start action to a compute instance */
  start: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeStartOptionalParams,
  ) => Promise<void>;
  /** Update Data Mounts of a Machine Learning compute. */
  updateDataMounts: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    dataMounts: ComputeInstanceDataMount[],
    options?: ComputeUpdateDataMountsOptionalParams,
  ) => Promise<void>;
  /** Gets secrets related to Machine Learning compute (storage keys, service credentials, etc). */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeListKeysOptionalParams,
  ) => Promise<ComputeSecretsUnion>;
  /** Get the details (e.g IP address, port etc) of all the compute nodes in the compute. */
  listNodes: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeListNodesOptionalParams,
  ) => PagedAsyncIterableIterator<AmlComputeNodeInformation>;
  /** Updates the custom services list. The list of custom services provided shall be overwritten. */
  updateCustomServices: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    customServices: CustomService[],
    options?: ComputeUpdateCustomServicesOptionalParams,
  ) => Promise<void>;
  /** Gets computes in specified workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ComputeListOptionalParams,
  ) => PagedAsyncIterableIterator<ComputeResource>;
  /** Deletes specified Machine Learning compute. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeUpdateOptionalParams,
  ) => PollerLike<OperationState<ComputeResource>, ComputeResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ComputeResource>, ComputeResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeUpdateOptionalParams,
  ) => Promise<ComputeResource>;
  /** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComputeResource>, ComputeResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ComputeResource>, ComputeResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeCreateOrUpdateOptionalParams,
  ) => Promise<ComputeResource>;
  /** Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeGetOptionalParams,
  ) => Promise<ComputeResource>;
}

function _getCompute(context: AzureMachineLearningServicesManagementContext) {
  return {
    resize: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ResizeSchema,
      options?: ComputeResizeOptionalParams,
    ) => resize(context, resourceGroupName, workspaceName, computeName, parameters, options),
    beginResize: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ResizeSchema,
      options?: ComputeResizeOptionalParams,
    ) => {
      const poller = resize(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResizeAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ResizeSchema,
      options?: ComputeResizeOptionalParams,
    ) => {
      return await resize(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      );
    },
    getAllowedResizeSizes: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeGetAllowedResizeSizesOptionalParams,
    ) => getAllowedResizeSizes(context, resourceGroupName, workspaceName, computeName, options),
    updateIdleShutdownSetting: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: IdleShutdownSetting,
      options?: ComputeUpdateIdleShutdownSettingOptionalParams,
    ) =>
      updateIdleShutdownSetting(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      ),
    restart: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeRestartOptionalParams,
    ) => restart(context, resourceGroupName, workspaceName, computeName, options),
    beginRestart: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, workspaceName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, workspaceName, computeName, options);
    },
    stop: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeStopOptionalParams,
    ) => stop(context, resourceGroupName, workspaceName, computeName, options),
    beginStop: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, workspaceName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, workspaceName, computeName, options);
    },
    start: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeStartOptionalParams,
    ) => start(context, resourceGroupName, workspaceName, computeName, options),
    beginStart: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, workspaceName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, workspaceName, computeName, options);
    },
    updateDataMounts: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      dataMounts: ComputeInstanceDataMount[],
      options?: ComputeUpdateDataMountsOptionalParams,
    ) =>
      updateDataMounts(context, resourceGroupName, workspaceName, computeName, dataMounts, options),
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, computeName, options),
    listNodes: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeListNodesOptionalParams,
    ) => listNodes(context, resourceGroupName, workspaceName, computeName, options),
    updateCustomServices: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      customServices: CustomService[],
      options?: ComputeUpdateCustomServicesOptionalParams,
    ) =>
      updateCustomServices(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        customServices,
        options,
      ),
    list: (resourceGroupName: string, workspaceName: string, options?: ComputeListOptionalParams) =>
      list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      underlyingResourceAction: UnderlyingResourceAction,
      options?: ComputeDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        underlyingResourceAction,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      underlyingResourceAction: UnderlyingResourceAction,
      options?: ComputeDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        underlyingResourceAction,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      underlyingResourceAction: UnderlyingResourceAction,
      options?: ComputeDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        underlyingResourceAction,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ClusterUpdateParameters,
      options?: ComputeUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, computeName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ClusterUpdateParameters,
      options?: ComputeUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ClusterUpdateParameters,
      options?: ComputeUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ComputeResource,
      options?: ComputeCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, computeName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ComputeResource,
      options?: ComputeCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ComputeResource,
      options?: ComputeCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, computeName, options),
  };
}

export function _getComputeOperations(
  context: AzureMachineLearningServicesManagementContext,
): ComputeOperations {
  return {
    ..._getCompute(context),
  };
}
