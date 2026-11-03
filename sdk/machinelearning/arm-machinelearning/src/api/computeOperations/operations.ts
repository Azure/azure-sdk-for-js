// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  ComputeResource,
  CustomService,
  ComputeInstanceDataMount,
  ClusterUpdateParameters,
  _PaginatedComputeResourcesList,
  _AmlComputeNodesInformation,
  AmlComputeNodeInformation,
  ComputeSecretsUnion,
  IdleShutdownSetting,
  VirtualMachineSizeListResult,
  ResizeSchema,
  UnderlyingResourceAction,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  computeResourceSerializer,
  computeResourceDeserializer,
  customServiceArraySerializer,
  computeInstanceDataMountArraySerializer,
  clusterUpdateParametersSerializer,
  _paginatedComputeResourcesListDeserializer,
  _amlComputeNodesInformationDeserializer,
  computeSecretsUnionDeserializer,
  idleShutdownSettingSerializer,
  virtualMachineSizeListResultDeserializer,
  resizeSchemaSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resizeSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: ResizeSchema,
  options: ComputeOperationsResizeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/resize{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: resizeSchemaSerializer(parameters),
  });
}

export async function _resizeDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Updates the size of a Compute Instance. */
export function resize(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: ResizeSchema,
  options: ComputeOperationsResizeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resizeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resizeSend(context, resourceGroupName, workspaceName, computeName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getAllowedResizeSizesSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsGetAllowedResizeSizesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/getAllowedVmSizesForResize{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
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

export async function _getAllowedResizeSizesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineSizeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return virtualMachineSizeListResultDeserializer(result.body);
}

/** Returns supported virtual machine sizes for resize. */
export async function getAllowedResizeSizes(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsGetAllowedResizeSizesOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineSizeListResult> {
  const result = await _getAllowedResizeSizesSend(
    context,
    resourceGroupName,
    workspaceName,
    computeName,
    options,
  );
  return _getAllowedResizeSizesDeserialize(result);
}

export function _updateIdleShutdownSettingSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: IdleShutdownSetting,
  options: ComputeOperationsUpdateIdleShutdownSettingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/updateIdleShutdownSetting{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: idleShutdownSettingSerializer(parameters),
  });
}

export async function _updateIdleShutdownSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Updates the idle shutdown setting of a compute instance. */
export async function updateIdleShutdownSetting(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: IdleShutdownSetting,
  options: ComputeOperationsUpdateIdleShutdownSettingOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateIdleShutdownSettingSend(
    context,
    resourceGroupName,
    workspaceName,
    computeName,
    parameters,
    options,
  );
  return _updateIdleShutdownSettingDeserialize(result);
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Posts a restart action to a compute instance */
export function restart(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, workspaceName, computeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Posts a stop action to a compute instance */
export function stop(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, workspaceName, computeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Posts a start action to a compute instance */
export function start(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, workspaceName, computeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateDataMountsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  dataMounts: ComputeInstanceDataMount[],
  options: ComputeOperationsUpdateDataMountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/updateDataMounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: computeInstanceDataMountArraySerializer(dataMounts),
  });
}

export async function _updateDataMountsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Update Data Mounts of a Machine Learning compute. */
export async function updateDataMounts(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  dataMounts: ComputeInstanceDataMount[],
  options: ComputeOperationsUpdateDataMountsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateDataMountsSend(
    context,
    resourceGroupName,
    workspaceName,
    computeName,
    dataMounts,
    options,
  );
  return _updateDataMountsDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
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

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputeSecretsUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeSecretsUnionDeserializer(result.body);
}

/** Gets secrets related to Machine Learning compute (storage keys, service credentials, etc). */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsListKeysOptionalParams = { requestOptions: {} },
): Promise<ComputeSecretsUnion> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    workspaceName,
    computeName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listNodesSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsListNodesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/listNodes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
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

export async function _listNodesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AmlComputeNodesInformation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _amlComputeNodesInformationDeserializer(result.body);
}

/** Get the details (e.g IP address, port etc) of all the compute nodes in the compute. */
export function listNodes(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsListNodesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AmlComputeNodeInformation> {
  return buildPagedAsyncIterator(
    context,
    () => _listNodesSend(context, resourceGroupName, workspaceName, computeName, options),
    _listNodesDeserialize,
    ["200"],
    {
      itemName: "nodes",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _updateCustomServicesSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  customServices: CustomService[],
  options: ComputeOperationsUpdateCustomServicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/customServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: customServiceArraySerializer(customServices),
  });
}

export async function _updateCustomServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Updates the custom services list. The list of custom services provided shall be overwritten. */
export async function updateCustomServices(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  customServices: CustomService[],
  options: ComputeOperationsUpdateCustomServicesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateCustomServicesSend(
    context,
    resourceGroupName,
    workspaceName,
    computeName,
    customServices,
    options,
  );
  return _updateCustomServicesDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ComputeOperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes{?api%2Dversion,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PaginatedComputeResourcesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _paginatedComputeResourcesListDeserializer(result.body);
}

/** Gets computes in specified workspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ComputeOperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ComputeResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
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
  computeName: string,
  underlyingResourceAction: UnderlyingResourceAction,
  options: ComputeOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}{?api%2Dversion,underlyingResourceAction}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      underlyingResourceAction: underlyingResourceAction,
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

/** Deletes specified Machine Learning compute. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  underlyingResourceAction: UnderlyingResourceAction,
  options: ComputeOperationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        underlyingResourceAction,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: ClusterUpdateParameters,
  options: ComputeOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
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
    body: clusterUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ComputeResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeResourceDeserializer(result.body);
}

/** Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: ClusterUpdateParameters,
  options: ComputeOperationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ComputeResource>, ComputeResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, workspaceName, computeName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<ComputeResource>, ComputeResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: ComputeResource,
  options: ComputeOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
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
    body: computeResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputeResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeResourceDeserializer(result.body);
}

/** Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  parameters: ComputeResource,
  options: ComputeOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ComputeResource>, ComputeResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        computeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<ComputeResource>, ComputeResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      computeName: computeName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ComputeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeResourceDeserializer(result.body);
}

/** Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  computeName: string,
  options: ComputeOperationsGetOptionalParams = { requestOptions: {} },
): Promise<ComputeResource> {
  const result = await _getSend(context, resourceGroupName, workspaceName, computeName, options);
  return _getDeserialize(result);
}
