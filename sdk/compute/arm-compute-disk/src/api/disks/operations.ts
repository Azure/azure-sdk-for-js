// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  Disk,
  DiskUpdate,
  _DiskList,
  GrantAccessData,
  AccessUri,
  OkResponse,
} from "../../models/models.js";
import {
  diskSerializer,
  diskDeserializer,
  cloudErrorDeserializer,
  diskUpdateSerializer,
  _diskListDeserializer,
  grantAccessDataSerializer,
  accessUriDeserializer,
  okResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DisksRevokeAccessOptionalParams,
  DisksGrantAccessOptionalParams,
  DisksListOptionalParams,
  DisksListByResourceGroupOptionalParams,
  DisksDeleteOptionalParams,
  DisksUpdateOptionalParams,
  DisksCreateOrUpdateOptionalParams,
  DisksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revokeAccessSend(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  options: DisksRevokeAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/endGetAccess{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskName: diskName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeAccessDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Revokes access to a disk. */
export function revokeAccess(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  options: DisksRevokeAccessOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _revokeAccessDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _revokeAccessSend(context, resourceGroupName, diskName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _grantAccessSend(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  grantAccessData: GrantAccessData,
  options: DisksGrantAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/beginGetAccess{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskName: diskName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: grantAccessDataSerializer(grantAccessData),
  });
}

export async function _grantAccessDeserialize(result: PathUncheckedResponse): Promise<AccessUri> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return accessUriDeserializer(result.body);
}

/** Grants access to a disk. */
export function grantAccess(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  grantAccessData: GrantAccessData,
  options: DisksGrantAccessOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessUri>, AccessUri> {
  return getLongRunningPoller(context, _grantAccessDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _grantAccessSend(context, resourceGroupName, diskName, grantAccessData, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AccessUri>, AccessUri>;
}

export function _listSend(
  context: Client,
  options: DisksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/disks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_DiskList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _diskListDeserializer(result.body);
}

/** Lists all the disks under a subscription. */
export function list(
  context: Client,
  options: DisksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Disk> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DisksListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiskList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _diskListDeserializer(result.body);
}

/** Lists all the disks under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DisksListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Disk> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  options: DisksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskName: diskName,
      "api%2Dversion": context.apiVersion,
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
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a disk. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  options: DisksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, diskName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  disk: DiskUpdate,
  options: DisksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskName: diskName,
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
    body: diskUpdateSerializer(disk),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Updates (patches) a disk. */
export function update(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  disk: DiskUpdate,
  options: DisksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, diskName, disk, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  disk: Disk,
  options: DisksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskName: diskName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: diskSerializer(disk),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Creates or updates a disk. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  disk: Disk,
  options: DisksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, diskName, disk, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  options: DisksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      diskName: diskName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Disk> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return diskDeserializer(result.body);
}

/** Gets information about a disk. */
export async function get(
  context: Client,
  resourceGroupName: string,
  diskName: string,
  options: DisksGetOptionalParams = { requestOptions: {} },
): Promise<Disk> {
  const result = await _getSend(context, resourceGroupName, diskName, options);
  return _getDeserialize(result);
}
