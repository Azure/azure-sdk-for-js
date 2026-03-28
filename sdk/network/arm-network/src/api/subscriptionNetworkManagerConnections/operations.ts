// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkManagerConnection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkManagerConnectionSerializer,
  networkManagerConnectionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkManagerConnectionListResult } from "../../models/models.js";
import { _networkManagerConnectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionNetworkManagerConnectionsListOptionalParams,
  SubscriptionNetworkManagerConnectionsDeleteOptionalParams,
  SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams,
  SubscriptionNetworkManagerConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: SubscriptionNetworkManagerConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkManagerConnections{?api%2Dversion,%24top,%24skipToken}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkManagerConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkManagerConnectionListResultDeserializer(result.body);
}

/** List all network manager connections created by this subscription. */
export function list(
  context: Client,
  options: SubscriptionNetworkManagerConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkManagerConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  networkManagerConnectionName: string,
  options: SubscriptionNetworkManagerConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      networkManagerConnectionName: networkManagerConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete specified connection created by this subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  networkManagerConnectionName: string,
  options: SubscriptionNetworkManagerConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, networkManagerConnectionName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  networkManagerConnectionName: string,
  parameters: NetworkManagerConnection,
  options: SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      networkManagerConnectionName: networkManagerConnectionName,
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
    body: networkManagerConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerConnectionDeserializer(result.body);
}

/** Create a network manager connection on this subscription. */
export async function createOrUpdate(
  context: Client,
  networkManagerConnectionName: string,
  parameters: NetworkManagerConnection,
  options: SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkManagerConnection> {
  const result = await _createOrUpdateSend(
    context,
    networkManagerConnectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  networkManagerConnectionName: string,
  options: SubscriptionNetworkManagerConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      networkManagerConnectionName: networkManagerConnectionName,
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
): Promise<NetworkManagerConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerConnectionDeserializer(result.body);
}

/** Get a specified connection created by this subscription. */
export async function get(
  context: Client,
  networkManagerConnectionName: string,
  options: SubscriptionNetworkManagerConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkManagerConnection> {
  const result = await _getSend(context, networkManagerConnectionName, options);
  return _getDeserialize(result);
}
