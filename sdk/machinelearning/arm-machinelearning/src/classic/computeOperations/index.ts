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
} from "../../api/computeOperations/operations.js";
import type {
  ComputeOperationsResizeOptionalParams,
  ComputeOperationsGetAllowedResizeSizesOptionalParams,
  ComputeOperationsUpdateIdleShutdownSettingOptionalParams,
  ComputeOperationsRestartOptionalParams,
  ComputeOperationsStopOptionalParams,
  ComputeOperationsStartOptionalParams,
  ComputeOperationsUpdateDataMountsOptionalParams,
  ComputeOperationsListKeysOptionalParams,
  ComputeOperationsListNodesOptionalParams,
  ComputeOperationsUpdateCustomServicesOptionalParams,
  ComputeOperationsListOptionalParams,
  ComputeOperationsDeleteOptionalParams,
  ComputeOperationsUpdateOptionalParams,
  ComputeOperationsCreateOrUpdateOptionalParams,
  ComputeOperationsGetOptionalParams,
} from "../../api/computeOperations/options.js";
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

/** Interface representing a ComputeOperations operations. */
export interface ComputeOperationsOperations {
  /** Updates the size of a Compute Instance. */
  resize: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ResizeSchema,
    options?: ComputeOperationsResizeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resize instead */
  beginResize: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ResizeSchema,
    options?: ComputeOperationsResizeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resize instead */
  beginResizeAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ResizeSchema,
    options?: ComputeOperationsResizeOptionalParams,
  ) => Promise<void>;
  /** Returns supported virtual machine sizes for resize. */
  getAllowedResizeSizes: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsGetAllowedResizeSizesOptionalParams,
  ) => Promise<VirtualMachineSizeListResult>;
  /** Updates the idle shutdown setting of a compute instance. */
  updateIdleShutdownSetting: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: IdleShutdownSetting,
    options?: ComputeOperationsUpdateIdleShutdownSettingOptionalParams,
  ) => Promise<void>;
  /** Posts a restart action to a compute instance */
  restart: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsRestartOptionalParams,
  ) => Promise<void>;
  /** Posts a stop action to a compute instance */
  stop: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsStopOptionalParams,
  ) => Promise<void>;
  /** Posts a start action to a compute instance */
  start: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsStartOptionalParams,
  ) => Promise<void>;
  /** Update Data Mounts of a Machine Learning compute. */
  updateDataMounts: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    dataMounts: ComputeInstanceDataMount[],
    options?: ComputeOperationsUpdateDataMountsOptionalParams,
  ) => Promise<void>;
  /** Gets secrets related to Machine Learning compute (storage keys, service credentials, etc). */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsListKeysOptionalParams,
  ) => Promise<ComputeSecretsUnion>;
  /** Get the details (e.g IP address, port etc) of all the compute nodes in the compute. */
  listNodes: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsListNodesOptionalParams,
  ) => PagedAsyncIterableIterator<AmlComputeNodeInformation>;
  /** Updates the custom services list. The list of custom services provided shall be overwritten. */
  updateCustomServices: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    customServices: CustomService[],
    options?: ComputeOperationsUpdateCustomServicesOptionalParams,
  ) => Promise<void>;
  /** Gets computes in specified workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ComputeOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ComputeResource>;
  /** Deletes specified Machine Learning compute. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    underlyingResourceAction: UnderlyingResourceAction,
    options?: ComputeOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeOperationsUpdateOptionalParams,
  ) => PollerLike<OperationState<ComputeResource>, ComputeResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeOperationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ComputeResource>, ComputeResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ClusterUpdateParameters,
    options?: ComputeOperationsUpdateOptionalParams,
  ) => Promise<ComputeResource>;
  /** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComputeResource>, ComputeResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ComputeResource>, ComputeResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    parameters: ComputeResource,
    options?: ComputeOperationsCreateOrUpdateOptionalParams,
  ) => Promise<ComputeResource>;
  /** Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    computeName: string,
    options?: ComputeOperationsGetOptionalParams,
  ) => Promise<ComputeResource>;
}

function _getComputeOperations(context: AzureMachineLearningServicesManagementContext) {
  return {
    resize: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ResizeSchema,
      options?: ComputeOperationsResizeOptionalParams,
    ) => resize(context, resourceGroupName, workspaceName, computeName, parameters, options),
    beginResize: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ResizeSchema,
      options?: ComputeOperationsResizeOptionalParams,
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
      options?: ComputeOperationsResizeOptionalParams,
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
      options?: ComputeOperationsGetAllowedResizeSizesOptionalParams,
    ) => getAllowedResizeSizes(context, resourceGroupName, workspaceName, computeName, options),
    updateIdleShutdownSetting: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: IdleShutdownSetting,
      options?: ComputeOperationsUpdateIdleShutdownSettingOptionalParams,
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
      options?: ComputeOperationsRestartOptionalParams,
    ) => restart(context, resourceGroupName, workspaceName, computeName, options),
    beginRestart: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, workspaceName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, workspaceName, computeName, options);
    },
    stop: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsStopOptionalParams,
    ) => stop(context, resourceGroupName, workspaceName, computeName, options),
    beginStop: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, workspaceName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, workspaceName, computeName, options);
    },
    start: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsStartOptionalParams,
    ) => start(context, resourceGroupName, workspaceName, computeName, options),
    beginStart: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, workspaceName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, workspaceName, computeName, options);
    },
    updateDataMounts: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      dataMounts: ComputeInstanceDataMount[],
      options?: ComputeOperationsUpdateDataMountsOptionalParams,
    ) =>
      updateDataMounts(context, resourceGroupName, workspaceName, computeName, dataMounts, options),
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, computeName, options),
    listNodes: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      options?: ComputeOperationsListNodesOptionalParams,
    ) => listNodes(context, resourceGroupName, workspaceName, computeName, options),
    updateCustomServices: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      customServices: CustomService[],
      options?: ComputeOperationsUpdateCustomServicesOptionalParams,
    ) =>
      updateCustomServices(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        customServices,
        options,
      ),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ComputeOperationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      underlyingResourceAction: UnderlyingResourceAction,
      options?: ComputeOperationsDeleteOptionalParams,
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
      options?: ComputeOperationsDeleteOptionalParams,
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
      options?: ComputeOperationsDeleteOptionalParams,
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
      options?: ComputeOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, computeName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ClusterUpdateParameters,
      options?: ComputeOperationsUpdateOptionalParams,
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
      options?: ComputeOperationsUpdateOptionalParams,
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
      options?: ComputeOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, computeName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      computeName: string,
      parameters: ComputeResource,
      options?: ComputeOperationsCreateOrUpdateOptionalParams,
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
      options?: ComputeOperationsCreateOrUpdateOptionalParams,
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
      options?: ComputeOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, computeName, options),
  };
}

export function _getComputeOperationsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ComputeOperationsOperations {
  return {
    ..._getComputeOperations(context),
  };
}
