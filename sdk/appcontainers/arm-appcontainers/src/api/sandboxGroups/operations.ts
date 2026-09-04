// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext as Client } from "../index.js";
import type {
  SandboxGroup,
  SandboxGroupPatch,
  _SandboxGroupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sandboxGroupSerializer,
  sandboxGroupDeserializer,
  sandboxGroupPatchSerializer,
  _sandboxGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SandboxGroupsListBySubscriptionOptionalParams,
  SandboxGroupsListByResourceGroupOptionalParams,
  SandboxGroupsDeleteOptionalParams,
  SandboxGroupsUpdateOptionalParams,
  SandboxGroupsCreateOrUpdateOptionalParams,
  SandboxGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: SandboxGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/sandboxGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SandboxGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sandboxGroupListResultDeserializer(result.body);
}

/** Get all SandboxGroups for a subscription. */
export function listBySubscription(
  context: Client,
  options: SandboxGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SandboxGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SandboxGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SandboxGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sandboxGroupListResultDeserializer(result.body);
}

/** Get all SandboxGroups in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SandboxGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SandboxGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  options: SandboxGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}{?api%2Dversion}",
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

/** Delete a SandboxGroup. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  options: SandboxGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, sandboxGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  properties: SandboxGroupPatch,
  options: SandboxGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sandboxGroupPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Patches a SandboxGroup. */
export function update(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  properties: SandboxGroupPatch,
  options: SandboxGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sandboxGroupName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  resource: SandboxGroup,
  options: SandboxGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sandboxGroupSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SandboxGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sandboxGroupDeserializer(result.body);
}

/** Create or update a SandboxGroup. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  resource: SandboxGroup,
  options: SandboxGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SandboxGroup>, SandboxGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, sandboxGroupName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<SandboxGroup>, SandboxGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  options: SandboxGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sandboxGroups/{sandboxGroupName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SandboxGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sandboxGroupDeserializer(result.body);
}

/** Get the properties of a SandboxGroup. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sandboxGroupName: string,
  options: SandboxGroupsGetOptionalParams = { requestOptions: {} },
): Promise<SandboxGroup> {
  const result = await _getSend(context, resourceGroupName, sandboxGroupName, options);
  return _getDeserialize(result);
}
