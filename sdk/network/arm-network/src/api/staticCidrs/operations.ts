// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { StaticCidr, _StaticCidrList } from "../../models/microsoft/network/models.js";
import {
  commonErrorResponseDeserializer,
  staticCidrSerializer,
  staticCidrDeserializer,
  _staticCidrListDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StaticCidrsListOptionalParams,
  StaticCidrsDeleteOptionalParams,
  StaticCidrsCreateOptionalParams,
  StaticCidrsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: StaticCidrsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/staticCidrs{?api%2Dversion,skipToken,skip,top,sortKey,sortValue}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
      skipToken: options?.skipToken,
      skip: options?.skip,
      top: options?.top,
      sortKey: options?.sortKey,
      sortValue: options?.sortValue,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_StaticCidrList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return _staticCidrListDeserializer(result.body);
}

/** Gets list of Static CIDR resources at Network Manager level. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: StaticCidrsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticCidr> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, poolName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  staticCidrName: string,
  options: StaticCidrsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/staticCidrs/{staticCidrName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      staticCidrName: staticCidrName,
      "api%2Dversion": "2025-05-01",
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
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete the Static CIDR resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  staticCidrName: string,
  options: StaticCidrsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        networkManagerName,
        poolName,
        staticCidrName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  staticCidrName: string,
  options: StaticCidrsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/staticCidrs/{staticCidrName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      staticCidrName: staticCidrName,
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
    body: !options["body"] ? options["body"] : staticCidrSerializer(options["body"]),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<StaticCidr> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return staticCidrDeserializer(result.body);
}

/** Creates/Updates the Static CIDR resource. */
export async function create(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  staticCidrName: string,
  options: StaticCidrsCreateOptionalParams = { requestOptions: {} },
): Promise<StaticCidr> {
  const result = await _createSend(
    context,
    resourceGroupName,
    networkManagerName,
    poolName,
    staticCidrName,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  staticCidrName: string,
  options: StaticCidrsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/staticCidrs/{staticCidrName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      staticCidrName: staticCidrName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StaticCidr> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return staticCidrDeserializer(result.body);
}

/** Gets the specific Static CIDR resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  staticCidrName: string,
  options: StaticCidrsGetOptionalParams = { requestOptions: {} },
): Promise<StaticCidr> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkManagerName,
    poolName,
    staticCidrName,
    options,
  );
  return _getDeserialize(result);
}
