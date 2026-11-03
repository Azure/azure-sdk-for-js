// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  InferenceGroup,
  PartialMinimalTrackedResourceWithSku,
  _InferenceGroupTrackedResourceArmPaginatedResult,
  DeltaModelStatusRequest,
  DeltaModelStatusResponse,
  DeltaModelListRequest,
  _StringArmPaginatedResult,
  DeltaModelModifyRequest,
  GroupStatus,
  _SkuResourceArmPaginatedResult,
  SkuResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  inferenceGroupSerializer,
  inferenceGroupDeserializer,
  partialMinimalTrackedResourceWithSkuSerializer,
  _inferenceGroupTrackedResourceArmPaginatedResultDeserializer,
  deltaModelStatusRequestSerializer,
  deltaModelStatusResponseDeserializer,
  deltaModelListRequestSerializer,
  _stringArmPaginatedResultDeserializer,
  deltaModelModifyRequestSerializer,
  groupStatusDeserializer,
  _skuResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSkusSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}/skus{?api%2Dversion,count,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      count: options?.count,
      "%24skip": options?.skip,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _skuResourceArmPaginatedResultDeserializer(result.body);
}

/** List Inference Group Skus. */
export function listSkus(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsListSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkuResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSkusSend(context, resourceGroupName, workspaceName, poolName, groupName, options),
    _listSkusDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _getStatusSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsGetStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}/getStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getStatusDeserialize(result: PathUncheckedResponse): Promise<GroupStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return groupStatusDeserializer(result.body);
}

/** Retrieve inference group status. */
export async function getStatus(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsGetStatusOptionalParams = { requestOptions: {} },
): Promise<GroupStatus> {
  const result = await _getStatusSend(
    context,
    resourceGroupName,
    workspaceName,
    poolName,
    groupName,
    options,
  );
  return _getStatusDeserialize(result);
}

export function _modifyDeltaModelsAsyncSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: DeltaModelModifyRequest,
  options: InferenceGroupsModifyDeltaModelsAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}/deltaModels/modify{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: deltaModelModifyRequestSerializer(body),
  });
}

export async function _modifyDeltaModelsAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Modify delta models associated with the InferenceGroup and the target base model. */
export function modifyDeltaModelsAsync(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: DeltaModelModifyRequest,
  options: InferenceGroupsModifyDeltaModelsAsyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _modifyDeltaModelsAsyncDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _modifyDeltaModelsAsyncSend(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listDeltaModelsAsyncSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: DeltaModelListRequest,
  options: InferenceGroupsListDeltaModelsAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}/deltaModels/list{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deltaModelListRequestSerializer(body),
  });
}

export async function _listDeltaModelsAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<_StringArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _stringArmPaginatedResultDeserializer(result.body);
}

/** List delta models associated with the InferenceGroup and the target base model. */
export function listDeltaModelsAsync(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: DeltaModelListRequest,
  options: InferenceGroupsListDeltaModelsAsyncOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listDeltaModelsAsyncSend(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      ),
    _listDeltaModelsAsyncDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _getDeltaModelsStatusAsyncSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: DeltaModelStatusRequest,
  options: InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}/deltaModels/getStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deltaModelStatusRequestSerializer(body),
  });
}

export async function _getDeltaModelsStatusAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<DeltaModelStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deltaModelStatusResponseDeserializer(result.body);
}

/** Retrieve status of delta models associated with the InferenceGroup and the target base model. */
export async function getDeltaModelsStatusAsync(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: DeltaModelStatusRequest,
  options: InferenceGroupsGetDeltaModelsStatusAsyncOptionalParams = { requestOptions: {} },
): Promise<DeltaModelStatusResponse> {
  const result = await _getDeltaModelsStatusAsyncSend(
    context,
    resourceGroupName,
    workspaceName,
    poolName,
    groupName,
    body,
    options,
  );
  return _getDeltaModelsStatusAsyncDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  options: InferenceGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups{?api%2Dversion,count,%24skip,tags,properties,orderBy}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      count: options?.count,
      "%24skip": options?.skip,
      tags: options?.tags,
      properties: options?.properties,
      orderBy: options?.orderBy,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_InferenceGroupTrackedResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _inferenceGroupTrackedResourceArmPaginatedResultDeserializer(result.body);
}

/** List Inference Groups. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  options: InferenceGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InferenceGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, poolName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete InferenceGroup (asynchronous). */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, poolName, groupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: PartialMinimalTrackedResourceWithSku,
  options: InferenceGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partialMinimalTrackedResourceWithSkuSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<InferenceGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return inferenceGroupDeserializer(result.body);
}

/** Update InferenceGroup (asynchronous). */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: PartialMinimalTrackedResourceWithSku,
  options: InferenceGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InferenceGroup>, InferenceGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, workspaceName, poolName, groupName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<InferenceGroup>, InferenceGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: InferenceGroup,
  options: InferenceGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: inferenceGroupSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InferenceGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return inferenceGroupDeserializer(result.body);
}

/** Create or update InferenceGroup (asynchronous). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  body: InferenceGroup,
  options: InferenceGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InferenceGroup>, InferenceGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        groupName,
        body,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<InferenceGroup>, InferenceGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/groups/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InferenceGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return inferenceGroupDeserializer(result.body);
}

/** Get InferenceGroup. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  groupName: string,
  options: InferenceGroupsGetOptionalParams = { requestOptions: {} },
): Promise<InferenceGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    poolName,
    groupName,
    options,
  );
  return _getDeserialize(result);
}
