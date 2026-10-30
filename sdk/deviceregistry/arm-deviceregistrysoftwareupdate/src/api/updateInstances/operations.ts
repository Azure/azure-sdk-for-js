// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceUpdateContext as Client } from "../index.js";
import type {
  UpdateInstance,
  UpdateInstanceUpdate,
  _UpdateInstanceListResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  LinkPreflightRequest,
  LinkPreflightResponse,
  LinkInitiateRequest,
  LinkNotifyRequest,
  LinkUpdateRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateInstanceSerializer,
  updateInstanceDeserializer,
  updateInstanceUpdateSerializer,
  _updateInstanceListResultDeserializer,
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResultDeserializer,
  linkPreflightRequestSerializer,
  linkPreflightResponseDeserializer,
  linkInitiateRequestSerializer,
  linkNotifyRequestSerializer,
  linkUpdateRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UpdateInstancesLinkUpdateOptionalParams,
  UpdateInstancesLinkNotifyOptionalParams,
  UpdateInstancesLinkInitiateOptionalParams,
  UpdateInstancesLinkPreflightOptionalParams,
  UpdateInstancesCheckNameAvailabilityOptionalParams,
  UpdateInstancesListBySubscriptionOptionalParams,
  UpdateInstancesListByResourceGroupOptionalParams,
  UpdateInstancesDeleteOptionalParams,
  UpdateInstancesUpdateOptionalParams,
  UpdateInstancesCreateOptionalParams,
  UpdateInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _linkUpdateSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkUpdateRequest,
  options: UpdateInstancesLinkUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}/linkUpdate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: linkUpdateRequestSerializer(body),
  });
}

export async function _linkUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Update linking properties (e.g., identity rotation). */
export function linkUpdate(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkUpdateRequest,
  options: UpdateInstancesLinkUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _linkUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkUpdateSend(context, resourceGroupName, updateInstanceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _linkNotifySend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkNotifyRequest,
  options: UpdateInstancesLinkNotifyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}/linkNotify{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: linkNotifyRequestSerializer(body),
  });
}

export async function _linkNotifyDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Notify linking state change (commit, fail, or namespaceDeleted). */
export function linkNotify(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkNotifyRequest,
  options: UpdateInstancesLinkNotifyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _linkNotifyDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkNotifySend(context, resourceGroupName, updateInstanceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _linkInitiateSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkInitiateRequest,
  options: UpdateInstancesLinkInitiateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}/linkInitiate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: linkInitiateRequestSerializer(body),
  });
}

export async function _linkInitiateDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Initiate account linking. Validates and persists binding, sets linkingState=InProgress. */
export function linkInitiate(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkInitiateRequest,
  options: UpdateInstancesLinkInitiateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _linkInitiateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkInitiateSend(context, resourceGroupName, updateInstanceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _linkPreflightSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkPreflightRequest,
  options: UpdateInstancesLinkPreflightOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}/linkPreflight{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: linkPreflightRequestSerializer(body),
  });
}

export async function _linkPreflightDeserialize(
  result: PathUncheckedResponse,
): Promise<LinkPreflightResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return linkPreflightResponseDeserializer(result.body);
}

/** Preflight check for account linking readiness. No state change. */
export async function linkPreflight(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  body: LinkPreflightRequest,
  options: UpdateInstancesLinkPreflightOptionalParams = { requestOptions: {} },
): Promise<LinkPreflightResponse> {
  const result = await _linkPreflightSend(
    context,
    resourceGroupName,
    updateInstanceName,
    body,
    options,
  );
  return _linkPreflightDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: UpdateInstancesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceUpdate/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Check if the Update Instance name is available. */
export async function checkNameAvailability(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: UpdateInstancesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, body, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: UpdateInstancesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceUpdate/updateInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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
): Promise<_UpdateInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _updateInstanceListResultDeserializer(result.body);
}

/** Returns list of Update Instances. */
export function listBySubscription(
  context: Client,
  options: UpdateInstancesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpdateInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: UpdateInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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
): Promise<_UpdateInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _updateInstanceListResultDeserializer(result.body);
}

/** Returns list of Update Instances. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: UpdateInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpdateInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  options: UpdateInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

/** Deletes an update instance. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  options: UpdateInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, updateInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  properties: UpdateInstanceUpdate,
  options: UpdateInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateInstanceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<UpdateInstance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateInstanceDeserializer(result.body);
}

/** Updates update instance's patchable properties. */
export function update(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  properties: UpdateInstanceUpdate,
  options: UpdateInstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateInstance>, UpdateInstance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, updateInstanceName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<UpdateInstance>, UpdateInstance>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  resource: UpdateInstance,
  options: UpdateInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateInstanceSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<UpdateInstance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateInstanceDeserializer(result.body);
}

/** Creates or updates an Update Instance. */
export function create(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  resource: UpdateInstance,
  options: UpdateInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateInstance>, UpdateInstance> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, updateInstanceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<UpdateInstance>, UpdateInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  options: UpdateInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceUpdate/updateInstances/{updateInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      updateInstanceName: updateInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UpdateInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateInstanceDeserializer(result.body);
}

/** Returns update instance details for the given update instance name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  updateInstanceName: string,
  options: UpdateInstancesGetOptionalParams = { requestOptions: {} },
): Promise<UpdateInstance> {
  const result = await _getSend(context, resourceGroupName, updateInstanceName, options);
  return _getDeserialize(result);
}
