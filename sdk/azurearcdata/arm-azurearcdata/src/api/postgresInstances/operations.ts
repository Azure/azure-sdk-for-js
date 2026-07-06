// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext as Client } from "../index.js";
import type {
  PostgresInstance,
  PostgresInstanceUpdate,
  _PostgresInstanceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  postgresInstanceSerializer,
  postgresInstanceDeserializer,
  postgresInstanceUpdateSerializer,
  _postgresInstanceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PostgresInstancesListOptionalParams,
  PostgresInstancesListByResourceGroupOptionalParams,
  PostgresInstancesDeleteOptionalParams,
  PostgresInstancesUpdateOptionalParams,
  PostgresInstancesCreateOptionalParams,
  PostgresInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: PostgresInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureArcData/postgresInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_PostgresInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _postgresInstanceListResultDeserializer(result.body);
}

/** List postgres Instance resources in the subscription */
export function list(
  context: Client,
  options: PostgresInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PostgresInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PostgresInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_PostgresInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _postgresInstanceListResultDeserializer(result.body);
}

/** Get a postgres Instances list by Resource group name. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PostgresInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PostgresInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  options: PostgresInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      postgresInstanceName: postgresInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a postgres Instance resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  options: PostgresInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, postgresInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  parameters: PostgresInstanceUpdate,
  options: PostgresInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      postgresInstanceName: postgresInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: postgresInstanceUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PostgresInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return postgresInstanceDeserializer(result.body);
}

/** Updates a postgres Instance resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  parameters: PostgresInstanceUpdate,
  options: PostgresInstancesUpdateOptionalParams = { requestOptions: {} },
): Promise<PostgresInstance> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    postgresInstanceName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  resource: PostgresInstance,
  options: PostgresInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      postgresInstanceName: postgresInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: postgresInstanceSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<PostgresInstance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return postgresInstanceDeserializer(result.body);
}

/** Creates or replaces a postgres Instance resource */
export function create(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  resource: PostgresInstance,
  options: PostgresInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PostgresInstance>, PostgresInstance> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, postgresInstanceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<PostgresInstance>, PostgresInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  options: PostgresInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureArcData/postgresInstances/{postgresInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      postgresInstanceName: postgresInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PostgresInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return postgresInstanceDeserializer(result.body);
}

/** Retrieves a postgres Instance resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  postgresInstanceName: string,
  options: PostgresInstancesGetOptionalParams = { requestOptions: {} },
): Promise<PostgresInstance> {
  const result = await _getSend(context, resourceGroupName, postgresInstanceName, options);
  return _getDeserialize(result);
}
