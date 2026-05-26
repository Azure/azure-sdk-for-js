// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  FleetspaceAccountResource,
  _FleetspaceAccountListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  fleetspaceAccountResourceSerializer,
  fleetspaceAccountResourceDeserializer,
  _fleetspaceAccountListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FleetspaceAccountListOptionalParams,
  FleetspaceAccountDeleteOptionalParams,
  FleetspaceAccountCreateOptionalParams,
  FleetspaceAccountGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  options: FleetspaceAccountListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetspaceName: fleetspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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
): Promise<_FleetspaceAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _fleetspaceAccountListResultDeserializer(result.body);
}

/** Lists all the fleetspaces accounts  under a fleetspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  options: FleetspaceAccountListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FleetspaceAccountResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, fleetName, fleetspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  fleetspaceAccountName: string,
  options: FleetspaceAccountDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetspaceName: fleetspaceName,
      fleetspaceAccountName: fleetspaceAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

/** Removes an existing Azure Cosmos DB fleetspace account from a fleetspace. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  fleetspaceAccountName: string,
  options: FleetspaceAccountDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  fleetspaceAccountName: string,
  body: FleetspaceAccountResource,
  options: FleetspaceAccountCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetspaceName: fleetspaceName,
      fleetspaceAccountName: fleetspaceAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fleetspaceAccountResourceSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<FleetspaceAccountResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fleetspaceAccountResourceDeserializer(result.body);
}

/** Creates an Azure Cosmos DB fleetspace account under a fleetspace. */
export function create(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  fleetspaceAccountName: string,
  body: FleetspaceAccountResource,
  options: FleetspaceAccountCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FleetspaceAccountResource>, FleetspaceAccountResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        fleetName,
        fleetspaceName,
        fleetspaceAccountName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<FleetspaceAccountResource>, FleetspaceAccountResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  fleetspaceAccountName: string,
  options: FleetspaceAccountGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      fleetspaceName: fleetspaceName,
      fleetspaceAccountName: fleetspaceAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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
): Promise<FleetspaceAccountResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fleetspaceAccountResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  fleetspaceName: string,
  fleetspaceAccountName: string,
  options: FleetspaceAccountGetOptionalParams = { requestOptions: {} },
): Promise<FleetspaceAccountResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    fleetName,
    fleetspaceName,
    fleetspaceAccountName,
    options,
  );
  return _getDeserialize(result);
}
