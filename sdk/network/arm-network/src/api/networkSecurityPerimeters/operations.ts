// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeter,
  UpdateTagsRequest,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkSecurityPerimeterSerializer,
  networkSecurityPerimeterDeserializer,
  updateTagsRequestSerializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkSecurityPerimeterListResult } from "../../models/models.js";
import { _networkSecurityPerimeterListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimetersListBySubscriptionOptionalParams,
  NetworkSecurityPerimetersListOptionalParams,
  NetworkSecurityPerimetersDeleteOptionalParams,
  NetworkSecurityPerimetersPatchOptionalParams,
  NetworkSecurityPerimetersCreateOrUpdateOptionalParams,
  NetworkSecurityPerimetersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: NetworkSecurityPerimetersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkSecurityPerimeters{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterListResultDeserializer(result.body);
}

/** List all network security perimeters in a subscription. */
export function listBySubscription(
  context: Client,
  options: NetworkSecurityPerimetersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeter> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkSecurityPerimetersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_NetworkSecurityPerimeterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterListResultDeserializer(result.body);
}

/** List network security perimeters in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: NetworkSecurityPerimetersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeter> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimetersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}{?api%2Dversion,forceDeletion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      "api%2Dversion": "2025-05-01",
      forceDeletion: options?.forceDeletion,
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

/** Deletes a network security perimeter. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimetersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkSecurityPerimeterName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  parameters: UpdateTagsRequest,
  options: NetworkSecurityPerimetersPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateTagsRequestSerializer(parameters),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterDeserializer(result.body);
}

/** Patch Tags for a Network Security Perimeter. */
export async function patch(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  parameters: UpdateTagsRequest,
  options: NetworkSecurityPerimetersPatchOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeter> {
  const result = await _patchSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    parameters,
    options,
  );
  return _patchDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  parameters: NetworkSecurityPerimeter,
  options: NetworkSecurityPerimetersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkSecurityPerimeterSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeter> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterDeserializer(result.body);
}

/** Creates or updates a Network Security Perimeter. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  parameters: NetworkSecurityPerimeter,
  options: NetworkSecurityPerimetersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeter> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimetersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterDeserializer(result.body);
}

/** Gets the specified network security perimeter by the name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimetersGetOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeter> {
  const result = await _getSend(context, resourceGroupName, networkSecurityPerimeterName, options);
  return _getDeserialize(result);
}
