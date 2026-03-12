// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AvsStorageContainerVolumeUpdate,
  avsStorageContainerVolumeUpdateSerializer,
  AvsStorageContainerVolume,
  avsStorageContainerVolumeDeserializer,
  _AvsStorageContainerVolumeListResult,
  _avsStorageContainerVolumeListResultDeserializer,
} from "../../models/models.js";
import {
  AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams,
  AvsStorageContainerVolumesDeleteOptionalParams,
  AvsStorageContainerVolumesGetOptionalParams,
  AvsStorageContainerVolumesUpdateOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAvsStorageContainerSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  options: AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers/{storageContainerName}/volumes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      storageContainerName: storageContainerName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByAvsStorageContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvsStorageContainerVolumeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _avsStorageContainerVolumeListResultDeserializer(result.body);
}

/** List volumes in an AVS storage container */
export function listByAvsStorageContainer(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  options: AvsStorageContainerVolumesListByAvsStorageContainerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AvsStorageContainerVolume> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAvsStorageContainerSend(
        context,
        resourceGroupName,
        storagePoolName,
        storageContainerName,
        options,
      ),
    _listByAvsStorageContainerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  volumeId: string,
  options: AvsStorageContainerVolumesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers/{storageContainerName}/volumes/{volumeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      storageContainerName: storageContainerName,
      volumeId: volumeId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a volume in an AVS storage container */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  volumeId: string,
  options: AvsStorageContainerVolumesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storagePoolName,
        storageContainerName,
        volumeId,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  volumeId: string,
  options: AvsStorageContainerVolumesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers/{storageContainerName}/volumes/{volumeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      storageContainerName: storageContainerName,
      volumeId: volumeId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AvsStorageContainerVolume> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return avsStorageContainerVolumeDeserializer(result.body);
}

/** Get a volume in an AVS storage container */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  volumeId: string,
  options: AvsStorageContainerVolumesGetOptionalParams = { requestOptions: {} },
): Promise<AvsStorageContainerVolume> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    storageContainerName,
    volumeId,
    options,
  );
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  volumeId: string,
  properties: AvsStorageContainerVolumeUpdate,
  options: AvsStorageContainerVolumesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers/{storageContainerName}/volumes/{volumeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      storageContainerName: storageContainerName,
      volumeId: volumeId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: avsStorageContainerVolumeUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AvsStorageContainerVolume> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return avsStorageContainerVolumeDeserializer(result.body);
}

/** Update a volume in an AVS storage container */
export function update(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  volumeId: string,
  properties: AvsStorageContainerVolumeUpdate,
  options: AvsStorageContainerVolumesUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AvsStorageContainerVolume>, AvsStorageContainerVolume> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storagePoolName,
        storageContainerName,
        volumeId,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AvsStorageContainerVolume>, AvsStorageContainerVolume>;
}
