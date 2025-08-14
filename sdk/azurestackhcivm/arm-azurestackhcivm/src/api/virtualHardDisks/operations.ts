// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  VirtualHardDisk,
  virtualHardDiskSerializer,
  virtualHardDiskDeserializer,
  VirtualHardDisksUpdateRequest,
  virtualHardDisksUpdateRequestSerializer,
  _VirtualHardDiskListResult,
  _virtualHardDiskListResultDeserializer,
  VirtualHardDiskUploadRequest,
  virtualHardDiskUploadRequestSerializer,
  VirtualHardDiskUploadResponse,
  virtualHardDiskUploadResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  VirtualHardDisksUploadOptionalParams,
  VirtualHardDisksListAllOptionalParams,
  VirtualHardDisksListByResourceGroupOptionalParams,
  VirtualHardDisksDeleteOptionalParams,
  VirtualHardDisksUpdateOptionalParams,
  VirtualHardDisksCreateOrUpdateOptionalParams,
  VirtualHardDisksGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _uploadSend(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  body: VirtualHardDiskUploadRequest,
  options: VirtualHardDisksUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}/upload{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHardDiskName: virtualHardDiskName,
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
    body: virtualHardDiskUploadRequestSerializer(body),
  });
}

export async function _uploadDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualHardDiskUploadResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualHardDiskUploadResponseDeserializer(result.body);
}

/** The operation to upload a virtual hard disk. */
export function upload(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  body: VirtualHardDiskUploadRequest,
  options: VirtualHardDisksUploadOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualHardDiskUploadResponse>, VirtualHardDiskUploadResponse> {
  return getLongRunningPoller(context, _uploadDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _uploadSend(context, resourceGroupName, virtualHardDiskName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<VirtualHardDiskUploadResponse>, VirtualHardDiskUploadResponse>;
}

export function _listAllSend(
  context: Client,
  options: VirtualHardDisksListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/virtualHardDisks{?api%2Dversion}",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualHardDiskListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _virtualHardDiskListResultDeserializer(result.body);
}

/** Lists all of the virtual hard disks in the specified subscription. Use the nextLink property in the response to get the next page of virtual hard disks. */
export function listAll(
  context: Client,
  options: VirtualHardDisksListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualHardDisk> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualHardDisksListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks{?api%2Dversion}",
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
): Promise<_VirtualHardDiskListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _virtualHardDiskListResultDeserializer(result.body);
}

/** Lists all of the virtual hard disks in the specified resource group. Use the nextLink property in the response to get the next page of virtual hard disks. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VirtualHardDisksListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualHardDisk> {
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
  virtualHardDiskName: string,
  options: VirtualHardDisksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHardDiskName: virtualHardDiskName,
      "api%2Dversion": context.apiVersion,
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

/** The operation to delete a virtual hard disk. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  options: VirtualHardDisksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualHardDiskName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  properties: VirtualHardDisksUpdateRequest,
  options: VirtualHardDisksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHardDiskName: virtualHardDiskName,
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
    body: virtualHardDisksUpdateRequestSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<VirtualHardDisk> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualHardDiskDeserializer(result.body);
}

/** The operation to update a virtual hard disk. */
export function update(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  properties: VirtualHardDisksUpdateRequest,
  options: VirtualHardDisksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualHardDisk>, VirtualHardDisk> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, virtualHardDiskName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<VirtualHardDisk>, VirtualHardDisk>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  resource: VirtualHardDisk,
  options: VirtualHardDisksCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHardDiskName: virtualHardDiskName,
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
    body: virtualHardDiskSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualHardDisk> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualHardDiskDeserializer(result.body);
}

/** The operation to create or update a virtual hard disk. Please note some properties can be set only during virtual hard disk creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  resource: VirtualHardDisk,
  options: VirtualHardDisksCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<VirtualHardDisk>, VirtualHardDisk> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, virtualHardDiskName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<VirtualHardDisk>, VirtualHardDisk>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  options: VirtualHardDisksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/virtualHardDisks/{virtualHardDiskName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHardDiskName: virtualHardDiskName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualHardDisk> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualHardDiskDeserializer(result.body);
}

/** Gets a virtual hard disk */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualHardDiskName: string,
  options: VirtualHardDisksGetOptionalParams = { requestOptions: {} },
): Promise<VirtualHardDisk> {
  const result = await _getSend(context, resourceGroupName, virtualHardDiskName, options);
  return _getDeserialize(result);
}
