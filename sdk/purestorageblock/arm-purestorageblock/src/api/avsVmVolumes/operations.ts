// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AvsVmVolumeUpdate,
  avsVmVolumeUpdateSerializer,
  AvsVmVolume,
  avsVmVolumeDeserializer,
  _AvsVmVolumeListResult,
  _avsVmVolumeListResultDeserializer,
} from "../../models/models.js";
import {
  AvsVmVolumesListByAvsVmOptionalParams,
  AvsVmVolumesDeleteOptionalParams,
  AvsVmVolumesGetOptionalParams,
  AvsVmVolumesUpdateOptionalParams,
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

export function _listByAvsVmSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  options: AvsVmVolumesListByAvsVmOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsVms/{avsVmId}/avsVmVolumes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      avsVmId: avsVmId,
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

export async function _listByAvsVmDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvsVmVolumeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _avsVmVolumeListResultDeserializer(result.body);
}

/** List volumes in an AVS VM */
export function listByAvsVm(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  options: AvsVmVolumesListByAvsVmOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvsVmVolume> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAvsVmSend(context, resourceGroupName, storagePoolName, avsVmId, options),
    _listByAvsVmDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  volumeId: string,
  options: AvsVmVolumesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsVms/{avsVmId}/avsVmVolumes/{volumeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      avsVmId: avsVmId,
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

/** Delete a volume in an AVS VM */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  volumeId: string,
  options: AvsVmVolumesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storagePoolName, avsVmId, volumeId, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  volumeId: string,
  options: AvsVmVolumesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsVms/{avsVmId}/avsVmVolumes/{volumeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      avsVmId: avsVmId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AvsVmVolume> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return avsVmVolumeDeserializer(result.body);
}

/** Get a volume in an AVS VM */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  volumeId: string,
  options: AvsVmVolumesGetOptionalParams = { requestOptions: {} },
): Promise<AvsVmVolume> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    avsVmId,
    volumeId,
    options,
  );
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  volumeId: string,
  properties: AvsVmVolumeUpdate,
  options: AvsVmVolumesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsVms/{avsVmId}/avsVmVolumes/{volumeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      avsVmId: avsVmId,
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
    body: avsVmVolumeUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AvsVmVolume> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return avsVmVolumeDeserializer(result.body);
}

/** Update a volume in an AVS VM */
export function update(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  avsVmId: string,
  volumeId: string,
  properties: AvsVmVolumeUpdate,
  options: AvsVmVolumesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AvsVmVolume>, AvsVmVolume> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storagePoolName,
        avsVmId,
        volumeId,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AvsVmVolume>, AvsVmVolume>;
}
