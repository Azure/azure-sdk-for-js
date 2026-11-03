// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext as Client } from "../index.js";
import type { Capability, CapabilityUpdate, _CapabilityListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  capabilitySerializer,
  capabilityDeserializer,
  capabilityUpdateSerializer,
  _capabilityListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CapabilitiesListByWorkloadSpaceOptionalParams,
  CapabilitiesDeleteOptionalParams,
  CapabilitiesUpdateOptionalParams,
  CapabilitiesCreateOrUpdateOptionalParams,
  CapabilitiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkloadSpaceSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: CapabilitiesListByWorkloadSpaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/capabilities{?api%2Dversion}",
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
): Promise<_CapabilityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _capabilityListResultDeserializer(result.body);
}

/** Lists capabilities in a workload space. */
export function listByWorkloadSpace(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: CapabilitiesListByWorkloadSpaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Capability> {
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
  capabilityName: string,
  options: CapabilitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      capabilityName: capabilityName,
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

/** Disables and deletes a capability. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  options: CapabilitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, spaceName, capabilityName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  properties: CapabilityUpdate,
  options: CapabilitiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      capabilityName: capabilityName,
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
    body: capabilityUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Capability> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return capabilityDeserializer(result.body);
}

/** Updates mutable capability properties. */
export function update(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  properties: CapabilityUpdate,
  options: CapabilitiesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Capability>, Capability> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, spaceName, capabilityName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<Capability>, Capability>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  resource: Capability,
  options: CapabilitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      capabilityName: capabilityName,
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
    body: capabilitySerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Capability> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return capabilityDeserializer(result.body);
}

/** Creates or replaces a capability. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  resource: Capability,
  options: CapabilitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Capability>, Capability> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, spaceName, capabilityName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<Capability>, Capability>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  options: CapabilitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}/capabilities/{capabilityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      capabilityName: capabilityName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Capability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return capabilityDeserializer(result.body);
}

/** Gets a capability. */
export async function get(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  capabilityName: string,
  options: CapabilitiesGetOptionalParams = { requestOptions: {} },
): Promise<Capability> {
  const result = await _getSend(context, resourceGroupName, spaceName, capabilityName, options);
  return _getDeserialize(result);
}
