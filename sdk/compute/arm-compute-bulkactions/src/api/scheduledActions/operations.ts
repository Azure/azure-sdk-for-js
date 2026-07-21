// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  ScheduledAction,
  ScheduledActionUpdate,
  _ScheduledActionListResult,
  _ResourceListResponse,
  ScheduledActionResource,
  ResourceAttachRequest,
  ResourceOperationResponse,
  ResourceDetachRequest,
  ResourcePatchRequest,
  CancelOccurrenceRequest,
  Occurrence,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  scheduledActionSerializer,
  scheduledActionDeserializer,
  scheduledActionUpdateSerializer,
  _scheduledActionListResultDeserializer,
  _resourceListResponseDeserializer,
  resourceAttachRequestSerializer,
  resourceOperationResponseDeserializer,
  resourceDetachRequestSerializer,
  resourcePatchRequestSerializer,
  cancelOccurrenceRequestSerializer,
  occurrenceDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScheduledActionsTriggerManualOccurrenceOptionalParams,
  ScheduledActionsCancelNextOccurrenceOptionalParams,
  ScheduledActionsEnableOptionalParams,
  ScheduledActionsDisableOptionalParams,
  ScheduledActionsPatchResourcesOptionalParams,
  ScheduledActionsDetachResourcesOptionalParams,
  ScheduledActionsAttachResourcesOptionalParams,
  ScheduledActionsListResourcesOptionalParams,
  ScheduledActionsListBySubscriptionOptionalParams,
  ScheduledActionsListByResourceGroupOptionalParams,
  ScheduledActionsDeleteOptionalParams,
  ScheduledActionsUpdateOptionalParams,
  ScheduledActionsCreateOrUpdateOptionalParams,
  ScheduledActionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _triggerManualOccurrenceSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsTriggerManualOccurrenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/triggerManualOccurrence{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _triggerManualOccurrenceDeserialize(
  result: PathUncheckedResponse,
): Promise<Occurrence> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return occurrenceDeserializer(result.body);
}
/** Trigger a manual occurrence of the scheduled action immediately, outside its normal schedule. */
export function triggerManualOccurrence(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsTriggerManualOccurrenceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Occurrence>, Occurrence> {
  return getLongRunningPoller(context, _triggerManualOccurrenceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerManualOccurrenceSend(context, resourceGroupName, scheduledActionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<Occurrence>, Occurrence>;
}

export function _cancelNextOccurrenceSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: CancelOccurrenceRequest,
  options: ScheduledActionsCancelNextOccurrenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/cancelNextOccurrence{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cancelOccurrenceRequestSerializer(body),
  });
}

export async function _cancelNextOccurrenceDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceOperationResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceOperationResponseDeserializer(result.body);
}
/** Cancel the next scheduled occurrence of the scheduled action. */
export function cancelNextOccurrence(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: CancelOccurrenceRequest,
  options: ScheduledActionsCancelNextOccurrenceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse> {
  return getLongRunningPoller(context, _cancelNextOccurrenceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelNextOccurrenceSend(context, resourceGroupName, scheduledActionName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
}

export function _enableSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Enable a previously disabled scheduled action so its future occurrences run. */
export function enable(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsEnableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _enableDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _enableSend(context, resourceGroupName, scheduledActionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _disableSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Disable the scheduled action so its future occurrences do not run. */
export function disable(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDisableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _disableDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableSend(context, resourceGroupName, scheduledActionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _patchResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourcePatchRequest,
  options: ScheduledActionsPatchResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/patchResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourcePatchRequestSerializer(body),
  });
}

export async function _patchResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceOperationResponseDeserializer(result.body);
}
/** A synchronous resource action. */
export async function patchResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourcePatchRequest,
  options: ScheduledActionsPatchResourcesOptionalParams = { requestOptions: {} },
): Promise<ResourceOperationResponse> {
  const result = await _patchResourcesSend(
    context,
    resourceGroupName,
    scheduledActionName,
    body,
    options,
  );
  return _patchResourcesDeserialize(result);
}

export function _detachResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceDetachRequest,
  options: ScheduledActionsDetachResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/detachResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceDetachRequestSerializer(body),
  });
}

export async function _detachResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceOperationResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceOperationResponseDeserializer(result.body);
}
/** Detach resources from the scheduled action so they are excluded from future occurrences. */
export function detachResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceDetachRequest,
  options: ScheduledActionsDetachResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse> {
  return getLongRunningPoller(context, _detachResourcesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _detachResourcesSend(context, resourceGroupName, scheduledActionName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
}

export function _attachResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceAttachRequest,
  options: ScheduledActionsAttachResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/attachResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceAttachRequestSerializer(body),
  });
}

export async function _attachResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceOperationResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceOperationResponseDeserializer(result.body);
}
/** Attach resources to the scheduled action so they are included in future occurrences. */
export function attachResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceAttachRequest,
  options: ScheduledActionsAttachResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse> {
  return getLongRunningPoller(context, _attachResourcesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _attachResourcesSend(context, resourceGroupName, scheduledActionName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<ResourceOperationResponse>, ResourceOperationResponse>;
}

export function _listResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsListResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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

export async function _listResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceListResponseDeserializer(result.body);
}
/** List resources attached to Scheduled Actions */
export function listResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsListResourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduledActionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourcesSend(context, resourceGroupName, scheduledActionName, options),
    _listResourcesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: ScheduledActionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/scheduledActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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
): Promise<_ScheduledActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _scheduledActionListResultDeserializer(result.body);
}
/** List ScheduledAction resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: ScheduledActionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduledAction> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ScheduledActionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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
): Promise<_ScheduledActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _scheduledActionListResultDeserializer(result.body);
}
/** List ScheduledAction resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ScheduledActionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScheduledAction> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-06-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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
/** Delete a ScheduledAction */
export function $delete(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, scheduledActionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  properties: ScheduledActionUpdate,
  options: ScheduledActionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scheduledActionUpdateSerializer(properties),
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
/** Update a ScheduledAction */
export function update(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  properties: ScheduledActionUpdate,
  options: ScheduledActionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, scheduledActionName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  resource: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scheduledActionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledAction> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scheduledActionDeserializer(result.body);
}
/** Create a ScheduledAction */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  resource: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ScheduledAction>, ScheduledAction> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, scheduledActionName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-06-preview",
  }) as PollerLike<OperationState<ScheduledAction>, ScheduledAction>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-06-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ScheduledAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scheduledActionDeserializer(result.body);
}
/** Get a ScheduledAction */
export async function get(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsGetOptionalParams = { requestOptions: {} },
): Promise<ScheduledAction> {
  const result = await _getSend(context, resourceGroupName, scheduledActionName, options);
  return _getDeserialize(result);
}
