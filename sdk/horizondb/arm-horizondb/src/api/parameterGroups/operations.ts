// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  ParameterGroup,
  _ParameterGroupListResult,
  _PagedParameterGroupConnectionProperties,
  ParameterGroupConnectionProperties,
  ParameterGroupCreateOrUpdate,
  ParameterGroupForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  parameterGroupDeserializer,
  _parameterGroupListResultDeserializer,
  _pagedParameterGroupConnectionPropertiesDeserializer,
  parameterGroupCreateOrUpdateSerializer,
  parameterGroupForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ParameterGroupsListConnectionsOptionalParams,
  ParameterGroupsListBySubscriptionOptionalParams,
  ParameterGroupsListByResourceGroupOptionalParams,
  ParameterGroupsDeleteOptionalParams,
  ParameterGroupsUpdateOptionalParams,
  ParameterGroupsCreateOrReplaceOptionalParams,
  ParameterGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listConnectionsSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: ParameterGroupsListConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedParameterGroupConnectionProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedParameterGroupConnectionPropertiesDeserializer(result.body);
}

/** Gets all connections to a parameter group. */
export function listConnections(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: ParameterGroupsListConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ParameterGroupConnectionProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listConnectionsSend(context, resourceGroupName, parameterGroupName, options),
    _listConnectionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: ParameterGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HorizonDb/parameterGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_ParameterGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _parameterGroupListResultDeserializer(result.body);
}

/** Lists all HorizonDB parameter groups in a subscription. */
export function listBySubscription(
  context: Client,
  options: ParameterGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ParameterGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ParameterGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_ParameterGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _parameterGroupListResultDeserializer(result.body);
}

/** Lists all HorizonDB parameter groups in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ParameterGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ParameterGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: ParameterGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

/** Deletes a HorizonDB parameter group. Deletion fails with a conflict when the parameter group is associated with one or more pools. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: ParameterGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, parameterGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  properties: ParameterGroupForPatchUpdateUpdate,
  options: ParameterGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: parameterGroupForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ParameterGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return parameterGroupDeserializer(result.body);
}

/** Updates an existing HorizonDB parameter group. Each connected pool's applyMethod setting controls whether dynamic parameter changes become effective immediately or remain pending until a customer-initiated pool Restart. Static parameter changes always remain pending until a customer-initiated pool Restart. Stop followed by Start and scheduled maintenance do not apply pending changes. The operation fails with a conflict while a previous update to this parameter group is still being processed. */
export function update(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  properties: ParameterGroupForPatchUpdateUpdate,
  options: ParameterGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ParameterGroup>, ParameterGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, parameterGroupName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ParameterGroup>, ParameterGroup>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  resource: ParameterGroupCreateOrUpdate,
  options: ParameterGroupsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: parameterGroupCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<ParameterGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return parameterGroupDeserializer(result.body);
}

/** Creates a new HorizonDB parameter group or replaces an existing parameter group. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  resource: ParameterGroupCreateOrUpdate,
  options: ParameterGroupsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ParameterGroup>, ParameterGroup> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, parameterGroupName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ParameterGroup>, ParameterGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: ParameterGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ParameterGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return parameterGroupDeserializer(result.body);
}

/** Gets information about a HorizonDB parameter group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: ParameterGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ParameterGroup> {
  const result = await _getSend(context, resourceGroupName, parameterGroupName, options);
  return _getDeserialize(result);
}
