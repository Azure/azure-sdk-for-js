// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  listSkus,
  getStatus,
  modifyDeltaModelsAsync,
  listDeltaModelsAsync,
  getDeltaModelsStatusAsync,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/inferenceGroups/operations.js";
import type {
  InferenceGroupsListSkusOptionalParams,
  InferenceGroupsGetStatusOptionalParams,
  InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
  InferenceGroupsListDeltaModelsAsyncOptionalParams,
  InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams,
  InferenceGroupsListOptionalParams,
  InferenceGroupsDeleteOptionalParams,
  InferenceGroupsUpdateOptionalParams,
  InferenceGroupsCreateOrUpdateOptionalParams,
  InferenceGroupsGetOptionalParams,
} from "../../api/inferenceGroups/options.js";
import type {
  InferenceGroup,
  PartialMinimalTrackedResourceWithSku,
  DeltaModelStatusRequest,
  DeltaModelStatusResponse,
  DeltaModelListRequest,
  DeltaModelModifyRequest,
  GroupStatus,
  SkuResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InferenceGroups operations. */
export interface InferenceGroupsOperations {
  /** List Inference Group Skus. */
  listSkus: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    options?: InferenceGroupsListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Retrieve inference group status. */
  getStatus: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    options?: InferenceGroupsGetStatusOptionalParams,
  ) => Promise<GroupStatus>;
  /** Modify delta models associated with the InferenceGroup and the target base model. */
  modifyDeltaModelsAsync: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: DeltaModelModifyRequest,
    options?: InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use modifyDeltaModelsAsync instead */
  beginModifyDeltaModelsAsync: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: DeltaModelModifyRequest,
    options?: InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use modifyDeltaModelsAsync instead */
  beginModifyDeltaModelsAsyncAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: DeltaModelModifyRequest,
    options?: InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
  ) => Promise<void>;
  /** List delta models associated with the InferenceGroup and the target base model. */
  listDeltaModelsAsync: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: DeltaModelListRequest,
    options?: InferenceGroupsListDeltaModelsAsyncOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Retrieve status of delta models associated with the InferenceGroup and the target base model. */
  getDeltaModelsStatusAsync: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: DeltaModelStatusRequest,
    options?: InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams,
  ) => Promise<DeltaModelStatusResponse>;
  /** List Inference Groups. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    options?: InferenceGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<InferenceGroup>;
  /** Delete InferenceGroup (asynchronous). */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    options?: InferenceGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    options?: InferenceGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    options?: InferenceGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update InferenceGroup (asynchronous). */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: InferenceGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<InferenceGroup>, InferenceGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: InferenceGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InferenceGroup>, InferenceGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: PartialMinimalTrackedResourceWithSku,
    options?: InferenceGroupsUpdateOptionalParams,
  ) => Promise<InferenceGroup>;
  /** Create or update InferenceGroup (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: InferenceGroup,
    options?: InferenceGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InferenceGroup>, InferenceGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: InferenceGroup,
    options?: InferenceGroupsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InferenceGroup>, InferenceGroup>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    body: InferenceGroup,
    options?: InferenceGroupsCreateOrUpdateOptionalParams,
  ) => Promise<InferenceGroup>;
  /** Get InferenceGroup. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    poolName: string,
    groupName: string,
    options?: InferenceGroupsGetOptionalParams,
  ) => Promise<InferenceGroup>;
}

function _getInferenceGroups(context: AzureMachineLearningServicesManagementContext) {
  return {
    listSkus: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      options?: InferenceGroupsListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, workspaceName, poolName, groupName, options),
    getStatus: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      options?: InferenceGroupsGetStatusOptionalParams,
    ) => getStatus(context, resourceGroupName, workspaceName, poolName, groupName, options),
    modifyDeltaModelsAsync: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: DeltaModelModifyRequest,
      options?: InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
    ) =>
      modifyDeltaModelsAsync(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      ),
    beginModifyDeltaModelsAsync: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: DeltaModelModifyRequest,
      options?: InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
    ) => {
      const poller = modifyDeltaModelsAsync(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginModifyDeltaModelsAsyncAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: DeltaModelModifyRequest,
      options?: InferenceGroupsModifyDeltaModelsAsyncOptionalParams,
    ) => {
      return await modifyDeltaModelsAsync(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      );
    },
    listDeltaModelsAsync: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: DeltaModelListRequest,
      options?: InferenceGroupsListDeltaModelsAsyncOptionalParams,
    ) =>
      listDeltaModelsAsync(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      ),
    getDeltaModelsStatusAsync: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: DeltaModelStatusRequest,
      options?: InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams,
    ) =>
      getDeltaModelsStatusAsync(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      options?: InferenceGroupsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, poolName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      options?: InferenceGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, poolName, groupName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      options?: InferenceGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      options?: InferenceGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, poolName, groupName, options);
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: PartialMinimalTrackedResourceWithSku,
      options?: InferenceGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, poolName, groupName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: PartialMinimalTrackedResourceWithSku,
      options?: InferenceGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: PartialMinimalTrackedResourceWithSku,
      options?: InferenceGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: InferenceGroup,
      options?: InferenceGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, poolName, groupName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: InferenceGroup,
      options?: InferenceGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      body: InferenceGroup,
      options?: InferenceGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      poolName: string,
      groupName: string,
      options?: InferenceGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, poolName, groupName, options),
  };
}

export function _getInferenceGroupsOperations(
  context: AzureMachineLearningServicesManagementContext,
): InferenceGroupsOperations {
  return {
    ..._getInferenceGroups(context),
  };
}
