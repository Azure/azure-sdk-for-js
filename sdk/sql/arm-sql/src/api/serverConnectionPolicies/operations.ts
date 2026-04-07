// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ServerConnectionPolicy,
  ConnectionPolicyName,
  _ServerConnectionPolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverConnectionPolicySerializer,
  serverConnectionPolicyDeserializer,
  _serverConnectionPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerConnectionPoliciesListByServerOptionalParams,
  ServerConnectionPoliciesCreateOrUpdateOptionalParams,
  ServerConnectionPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerConnectionPoliciesListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerConnectionPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _serverConnectionPolicyListResultDeserializer(result.body);
}

/** Lists connection policy */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerConnectionPoliciesListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerConnectionPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  connectionPolicyName: ConnectionPolicyName,
  parameters: ServerConnectionPolicy,
  options: ServerConnectionPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies/{connectionPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      connectionPolicyName: connectionPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverConnectionPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConnectionPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverConnectionPolicyDeserializer(result.body);
}

/** Updates a server connection policy */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  connectionPolicyName: ConnectionPolicyName,
  parameters: ServerConnectionPolicy,
  options: ServerConnectionPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerConnectionPolicy>, ServerConnectionPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        connectionPolicyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ServerConnectionPolicy>, ServerConnectionPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  connectionPolicyName: ConnectionPolicyName,
  options: ServerConnectionPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies/{connectionPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      connectionPolicyName: connectionPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ServerConnectionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverConnectionPolicyDeserializer(result.body);
}

/** Gets a server connection policy */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  connectionPolicyName: ConnectionPolicyName,
  options: ServerConnectionPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ServerConnectionPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    connectionPolicyName,
    options,
  );
  return _getDeserialize(result);
}
