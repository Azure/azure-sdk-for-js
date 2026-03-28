// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  ExpressRouteCrossConnectionPeering,
  _ExpressRouteCrossConnectionPeeringList,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  expressRouteCrossConnectionPeeringSerializer,
  expressRouteCrossConnectionPeeringDeserializer,
  _expressRouteCrossConnectionPeeringListDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams,
  ExpressRouteCrossConnectionPeeringsGetOptionalParams,
  ExpressRouteCrossConnectionPeeringsDeleteOptionalParams,
  ExpressRouteCrossConnectionPeeringsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  peeringParameters: ExpressRouteCrossConnectionPeering,
  options: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      peeringName: peeringName,
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
    body: expressRouteCrossConnectionPeeringSerializer(peeringParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCrossConnectionPeering> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCrossConnectionPeeringDeserializer(result.body);
}

/** Creates or updates a peering in the specified ExpressRouteCrossConnection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  peeringParameters: ExpressRouteCrossConnectionPeering,
  options: ExpressRouteCrossConnectionPeeringsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteCrossConnectionPeering>,
  ExpressRouteCrossConnectionPeering
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        peeringParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ExpressRouteCrossConnectionPeering>,
    ExpressRouteCrossConnectionPeering
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  options: ExpressRouteCrossConnectionPeeringsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      peeringName: peeringName,
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
): Promise<ExpressRouteCrossConnectionPeering> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteCrossConnectionPeeringDeserializer(result.body);
}

/** Gets the specified peering for the ExpressRouteCrossConnection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  options: ExpressRouteCrossConnectionPeeringsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCrossConnectionPeering> {
  const result = await _getSend(
    context,
    resourceGroupName,
    crossConnectionName,
    peeringName,
    options,
  );
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  options: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      peeringName: peeringName,
      "api%2Dversion": "2025-05-01",
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

/** Deletes the specified peering from the ExpressRouteCrossConnection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  options: ExpressRouteCrossConnectionPeeringsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, crossConnectionName, peeringName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  options: ExpressRouteCrossConnectionPeeringsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExpressRouteCrossConnectionPeeringList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _expressRouteCrossConnectionPeeringListDeserializer(result.body);
}

/** Gets all peerings in a specified ExpressRouteCrossConnection. */
export function list(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  options: ExpressRouteCrossConnectionPeeringsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCrossConnectionPeering> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, crossConnectionName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}
