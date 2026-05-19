// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext as Client } from "../index.js";
import type {
  VolumeGroup,
  VolumeGroupUpdate,
  _VolumeGroupListResult,
  ConnectionParametersResponse,
  VolumeGroupStatus,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  volumeGroupSerializer,
  volumeGroupDeserializer,
  volumeGroupUpdateSerializer,
  _volumeGroupListResultDeserializer,
  connectionParametersResponseDeserializer,
  volumeGroupStatusDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VolumeGroupsGetStatusOptionalParams,
  VolumeGroupsListConnectionParametersOptionalParams,
  VolumeGroupsListByStoragePoolOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsUpdateOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getStatusSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsGetStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/getStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<VolumeGroupStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeGroupStatusDeserializer(result.body);
}

/** Get current status and space information of the volume group */
export async function getStatus(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsGetStatusOptionalParams = { requestOptions: {} },
): Promise<VolumeGroupStatus> {
  const result = await _getStatusSend(
    context,
    resourceGroupName,
    storagePoolName,
    volumeGroupName,
    options,
  );
  return _getStatusDeserialize(result);
}

export function _listConnectionParametersSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsListConnectionParametersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/listConnectionParameters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listConnectionParametersDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionParametersResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionParametersResponseDeserializer(result.body);
}

/** Get connection parameters for ISCSI connection to the volume group */
export async function listConnectionParameters(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsListConnectionParametersOptionalParams = { requestOptions: {} },
): Promise<ConnectionParametersResponse> {
  const result = await _listConnectionParametersSend(
    context,
    resourceGroupName,
    storagePoolName,
    volumeGroupName,
    options,
  );
  return _listConnectionParametersDeserialize(result);
}

export function _listByStoragePoolSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  options: VolumeGroupsListByStoragePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByStoragePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_VolumeGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _volumeGroupListResultDeserializer(result.body);
}

/** List volume groups by storage pool */
export function listByStoragePool(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  options: VolumeGroupsListByStoragePoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VolumeGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStoragePoolSend(context, resourceGroupName, storagePoolName, options),
    _listByStoragePoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a volume group */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  properties: VolumeGroupUpdate,
  options: VolumeGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeGroupUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<VolumeGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeGroupDeserializer(result.body);
}

/** Update a volume group */
export function update(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  properties: VolumeGroupUpdate,
  options: VolumeGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VolumeGroup>, VolumeGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  resource: VolumeGroup,
  options: VolumeGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeGroupSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<VolumeGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeGroupDeserializer(result.body);
}

/** Create a volume group */
export function create(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  resource: VolumeGroup,
  options: VolumeGroupsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VolumeGroup>, VolumeGroup> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, storagePoolName, volumeGroupName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VolumeGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeGroupDeserializer(result.body);
}

/** Get a volume group */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupsGetOptionalParams = { requestOptions: {} },
): Promise<VolumeGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    volumeGroupName,
    options,
  );
  return _getDeserialize(result);
}
