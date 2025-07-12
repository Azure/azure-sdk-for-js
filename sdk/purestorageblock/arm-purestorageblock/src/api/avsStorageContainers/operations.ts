// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AvsStorageContainer,
  avsStorageContainerDeserializer,
  _AvsStorageContainerListResult,
  _avsStorageContainerListResultDeserializer,
} from "../../models/models.js";
import {
  AvsStorageContainersListByStoragePoolOptionalParams,
  AvsStorageContainersDeleteOptionalParams,
  AvsStorageContainersGetOptionalParams,
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

export function _listByStoragePoolSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  options: AvsStorageContainersListByStoragePoolOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
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

export async function _listByStoragePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvsStorageContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _avsStorageContainerListResultDeserializer(result.body);
}

/** List AVS storage containers by storage pool */
export function listByStoragePool(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  options: AvsStorageContainersListByStoragePoolOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AvsStorageContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByStoragePoolSend(context, resourceGroupName, storagePoolName, options),
    _listByStoragePoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  options: AvsStorageContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers/{storageContainerName}{?api%2Dversion}",
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

/** Delete an AVS storage container */
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
  options: AvsStorageContainersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storagePoolName, storageContainerName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  options: AvsStorageContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/avsStorageContainers/{storageContainerName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AvsStorageContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return avsStorageContainerDeserializer(result.body);
}

/** Get an AVS storage container */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  storageContainerName: string,
  options: AvsStorageContainersGetOptionalParams = { requestOptions: {} },
): Promise<AvsStorageContainer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    storageContainerName,
    options,
  );
  return _getDeserialize(result);
}
