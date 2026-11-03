// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext as Client } from "../index.js";
import type {
  RuntimeBinding,
  RuntimeBindingUpdate,
  _RuntimeBindingListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  runtimeBindingSerializer,
  runtimeBindingDeserializer,
  runtimeBindingUpdateSerializer,
  _runtimeBindingListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RuntimeBindingsListByWorkloadSpaceOptionalParams,
  RuntimeBindingsDeleteOptionalParams,
  RuntimeBindingsUpdateOptionalParams,
  RuntimeBindingsCreateOrUpdateOptionalParams,
  RuntimeBindingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkloadSpaceSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: RuntimeBindingsListByWorkloadSpaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeBindings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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

export async function _listByWorkloadSpaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_RuntimeBindingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _runtimeBindingListResultDeserializer(result.body);
}

/** Lists runtime bindings in a workload space. */
export function listByWorkloadSpace(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: RuntimeBindingsListByWorkloadSpaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RuntimeBinding> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkloadSpaceSend(context, resourceGroupName, spaceName, options),
    _listByWorkloadSpaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  options: RuntimeBindingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeBindings/{bindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      bindingName: bindingName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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

/** Deletes a runtime binding without deleting customer-owned referenced resources. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  options: RuntimeBindingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, spaceName, bindingName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  properties: RuntimeBindingUpdate,
  options: RuntimeBindingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeBindings/{bindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      bindingName: bindingName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runtimeBindingUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RuntimeBinding> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runtimeBindingDeserializer(result.body);
}

/** Updates mutable runtime binding properties. */
export function update(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  properties: RuntimeBindingUpdate,
  options: RuntimeBindingsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RuntimeBinding>, RuntimeBinding> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, spaceName, bindingName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<RuntimeBinding>, RuntimeBinding>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  resource: RuntimeBinding,
  options: RuntimeBindingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeBindings/{bindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      bindingName: bindingName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runtimeBindingSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RuntimeBinding> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runtimeBindingDeserializer(result.body);
}

/** Creates or replaces a runtime binding. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  resource: RuntimeBinding,
  options: RuntimeBindingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RuntimeBinding>, RuntimeBinding> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, spaceName, bindingName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<RuntimeBinding>, RuntimeBinding>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  options: RuntimeBindingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeBindings/{bindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      bindingName: bindingName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RuntimeBinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runtimeBindingDeserializer(result.body);
}

/** Gets a runtime binding. */
export async function get(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  bindingName: string,
  options: RuntimeBindingsGetOptionalParams = { requestOptions: {} },
): Promise<RuntimeBinding> {
  const result = await _getSend(context, resourceGroupName, spaceName, bindingName, options);
  return _getDeserialize(result);
}
