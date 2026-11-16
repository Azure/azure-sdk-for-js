// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext as Client } from "../index.js";
import type {
  RuntimeLink,
  RuntimeLinkUpdate,
  _RuntimeLinkListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  runtimeLinkSerializer,
  runtimeLinkDeserializer,
  runtimeLinkUpdateSerializer,
  _runtimeLinkListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RuntimeLinksListByWorkloadSpaceOptionalParams,
  RuntimeLinksDeleteOptionalParams,
  RuntimeLinksUpdateOptionalParams,
  RuntimeLinksCreateOrUpdateOptionalParams,
  RuntimeLinksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkloadSpaceSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: RuntimeLinksListByWorkloadSpaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeLinks{?api%2Dversion}",
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
): Promise<_RuntimeLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _runtimeLinkListResultDeserializer(result.body);
}

/** Lists runtime links in a workload space. */
export function listByWorkloadSpace(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: RuntimeLinksListByWorkloadSpaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RuntimeLink> {
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
  linkName: string,
  options: RuntimeLinksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeLinks/{linkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      linkName: linkName,
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

/** Deletes a runtime link without deleting its runtime bindings. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  options: RuntimeLinksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, spaceName, linkName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  properties: RuntimeLinkUpdate,
  options: RuntimeLinksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeLinks/{linkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      linkName: linkName,
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
    body: runtimeLinkUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RuntimeLink> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runtimeLinkDeserializer(result.body);
}

/** Updates mutable runtime link properties. */
export function update(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  properties: RuntimeLinkUpdate,
  options: RuntimeLinksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RuntimeLink>, RuntimeLink> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, spaceName, linkName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<RuntimeLink>, RuntimeLink>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  resource: RuntimeLink,
  options: RuntimeLinksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeLinks/{linkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      linkName: linkName,
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
    body: runtimeLinkSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RuntimeLink> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runtimeLinkDeserializer(result.body);
}

/** Creates or replaces a runtime link. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  resource: RuntimeLink,
  options: RuntimeLinksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RuntimeLink>, RuntimeLink> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, spaceName, linkName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<RuntimeLink>, RuntimeLink>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  options: RuntimeLinksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/runtimeLinks/{linkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      linkName: linkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RuntimeLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runtimeLinkDeserializer(result.body);
}

/** Gets a runtime link. */
export async function get(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  linkName: string,
  options: RuntimeLinksGetOptionalParams = { requestOptions: {} },
): Promise<RuntimeLink> {
  const result = await _getSend(context, resourceGroupName, spaceName, linkName, options);
  return _getDeserialize(result);
}
