// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext as Client } from "../index.js";
import type { Volume, VolumeUpdate, _VolumeListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  volumeSerializer,
  volumeDeserializer,
  volumeUpdateSerializer,
  _volumeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VolumesListByVolumeGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOptionalParams,
  VolumesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVolumeGroupSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumesListByVolumeGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/volumes{?api%2Dversion}",
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

export async function _listByVolumeGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_VolumeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _volumeListResultDeserializer(result.body);
}

/** List volumes by volume group */
export function listByVolumeGroup(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumesListByVolumeGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Volume> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVolumeGroupSend(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    _listByVolumeGroupDeserialize,
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
  volumeName: string,
  options: VolumesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
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

/** Delete a volume */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  properties: VolumeUpdate,
  options: VolumesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
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
    body: volumeUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Update a volume */
export function update(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  properties: VolumeUpdate,
  options: VolumesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        volumeName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  resource: Volume,
  options: VolumesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
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
    body: volumeSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Create a volume */
export function create(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  resource: Volume,
  options: VolumesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        volumeName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      volumeName: volumeName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Get a volume */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  volumeName: string,
  options: VolumesGetOptionalParams = { requestOptions: {} },
): Promise<Volume> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    volumeGroupName,
    volumeName,
    options,
  );
  return _getDeserialize(result);
}
