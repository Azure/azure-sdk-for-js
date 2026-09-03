// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext as Client } from "../index.js";
import type { VnetConnection, _VnetConnectionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  vnetConnectionSerializer,
  vnetConnectionDeserializer,
  _vnetConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VnetConnectionsListBySandboxGroupOptionalParams,
  VnetConnectionsDeleteOptionalParams,
  VnetConnectionsCreateOrUpdateOptionalParams,
  VnetConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySandboxGroupSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  options: VnetConnectionsListBySandboxGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}/vnetConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sandboxGroupName: sandboxGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listBySandboxGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_VnetConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _vnetConnectionListResultDeserializer(result.body);
}

/** List all VnetConnections in the specified SandboxGroup. */
export function listBySandboxGroup(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  options: VnetConnectionsListBySandboxGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VnetConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySandboxGroupSend(context, resourceGroupName, sandboxGroupName, options),
    _listBySandboxGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  vnetConnectionName: string,
  options: VnetConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}/vnetConnections/{vnetConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sandboxGroupName: sandboxGroupName,
      vnetConnectionName: vnetConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a VnetConnection. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  vnetConnectionName: string,
  options: VnetConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sandboxGroupName, vnetConnectionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  vnetConnectionName: string,
  resource: VnetConnection,
  options: VnetConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}/vnetConnections/{vnetConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sandboxGroupName: sandboxGroupName,
      vnetConnectionName: vnetConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetConnectionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return vnetConnectionDeserializer(result.body);
}

/** Create or update a VnetConnection. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  vnetConnectionName: string,
  resource: VnetConnection,
  options: VnetConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<VnetConnection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    sandboxGroupName,
    vnetConnectionName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  vnetConnectionName: string,
  options: VnetConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}/vnetConnections/{vnetConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sandboxGroupName: sandboxGroupName,
      vnetConnectionName: vnetConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VnetConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return vnetConnectionDeserializer(result.body);
}

/** Get the properties of a VnetConnection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  vnetConnectionName: string,
  options: VnetConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<VnetConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sandboxGroupName,
    vnetConnectionName,
    options,
  );
  return _getDeserialize(result);
}
