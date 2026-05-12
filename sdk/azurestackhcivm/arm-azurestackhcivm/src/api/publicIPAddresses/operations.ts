// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext as Client } from "../index.js";
import type {
  PublicIPAddress,
  PublicIPAddressTagsUpdate,
  _PublicIPAddressListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  publicIPAddressSerializer,
  publicIPAddressDeserializer,
  publicIPAddressTagsUpdateSerializer,
  _publicIPAddressListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PublicIPAddressesListAllOptionalParams,
  PublicIPAddressesListByResourceGroupOptionalParams,
  PublicIPAddressesDeleteOptionalParams,
  PublicIPAddressesUpdateTagsOptionalParams,
  PublicIPAddressesCreateOrUpdateOptionalParams,
  PublicIPAddressesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: PublicIPAddressesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/publicIPAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Lists all of the publicIPAddresses in the specified subscription. Use the nextLink property in the response to get the next page of PublicIP. */
export function listAll(
  context: Client,
  options: PublicIPAddressesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicIPAddress> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PublicIPAddressesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/publicIPAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PublicIPAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _publicIPAddressListResultDeserializer(result.body);
}

/** Lists all of the publicIPAddresses in the specified resource group. Use the nextLink property in the response to get the next page of PublicIP. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PublicIPAddressesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PublicIPAddress> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  options: PublicIPAddressesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/publicIPAddresses/{publicIPAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIPAddressName: publicIPAddressName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

/** The operation to delete a publicIPAddresses. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  options: PublicIPAddressesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, publicIPAddressName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  properties: PublicIPAddressTagsUpdate,
  options: PublicIPAddressesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/publicIPAddresses/{publicIPAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIPAddressName: publicIPAddressName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: publicIPAddressTagsUpdateSerializer(properties),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** Updates a publicIPAddress tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  properties: PublicIPAddressTagsUpdate,
  options: PublicIPAddressesUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PublicIPAddress>, PublicIPAddress> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, publicIPAddressName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  resource: PublicIPAddress,
  options: PublicIPAddressesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/publicIPAddresses/{publicIPAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIPAddressName: publicIPAddressName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: publicIPAddressSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PublicIPAddress> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** The operation to create or update a publicIPAddress. Please note some properties can be set only during PublicIP creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  resource: PublicIPAddress,
  options: PublicIPAddressesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PublicIPAddress>, PublicIPAddress> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, publicIPAddressName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<PublicIPAddress>, PublicIPAddress>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  options: PublicIPAddressesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/publicIPAddresses/{publicIPAddressName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      publicIPAddressName: publicIPAddressName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PublicIPAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return publicIPAddressDeserializer(result.body);
}

/** The operation to get a virtual network. */
export async function get(
  context: Client,
  resourceGroupName: string,
  publicIPAddressName: string,
  options: PublicIPAddressesGetOptionalParams = { requestOptions: {} },
): Promise<PublicIPAddress> {
  const result = await _getSend(context, resourceGroupName, publicIPAddressName, options);
  return _getDeserialize(result);
}
