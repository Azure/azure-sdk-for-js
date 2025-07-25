// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SubmitDeallocateRequest,
  submitDeallocateRequestSerializer,
  DeallocateResourceOperationResponse,
  deallocateResourceOperationResponseDeserializer,
  SubmitHibernateRequest,
  submitHibernateRequestSerializer,
  HibernateResourceOperationResponse,
  hibernateResourceOperationResponseDeserializer,
  SubmitStartRequest,
  submitStartRequestSerializer,
  StartResourceOperationResponse,
  startResourceOperationResponseDeserializer,
  ExecuteDeallocateRequest,
  executeDeallocateRequestSerializer,
  ExecuteHibernateRequest,
  executeHibernateRequestSerializer,
  ExecuteStartRequest,
  executeStartRequestSerializer,
  ExecuteCreateRequest,
  executeCreateRequestSerializer,
  CreateResourceOperationResponse,
  createResourceOperationResponseDeserializer,
  ExecuteDeleteRequest,
  executeDeleteRequestSerializer,
  DeleteResourceOperationResponse,
  deleteResourceOperationResponseDeserializer,
  GetOperationStatusRequest,
  getOperationStatusRequestSerializer,
  GetOperationStatusResponse,
  getOperationStatusResponseDeserializer,
  CancelOperationsRequest,
  cancelOperationsRequestSerializer,
  CancelOperationsResponse,
  cancelOperationsResponseDeserializer,
  GetOperationErrorsRequest,
  getOperationErrorsRequestSerializer,
  GetOperationErrorsResponse,
  getOperationErrorsResponseDeserializer,
  ScheduledAction,
  scheduledActionSerializer,
  scheduledActionDeserializer,
  ScheduledActionUpdate,
  scheduledActionUpdateSerializer,
  _ScheduledActionListResult,
  _scheduledActionListResultDeserializer,
  _ResourceListResponse,
  _resourceListResponseDeserializer,
  ScheduledActionResource,
  ResourceAttachRequest,
  resourceAttachRequestSerializer,
  RecurringActionsResourceOperationResult,
  recurringActionsResourceOperationResultDeserializer,
  ResourceDetachRequest,
  resourceDetachRequestSerializer,
  ResourcePatchRequest,
  resourcePatchRequestSerializer,
  CancelOccurrenceRequest,
  cancelOccurrenceRequestSerializer,
  Occurrence,
  occurrenceDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
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
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
  ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _triggerManualOccurrenceSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsTriggerManualOccurrenceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/triggerManualOccurrence{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _triggerManualOccurrenceDeserialize(
  result: PathUncheckedResponse,
): Promise<Occurrence> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return occurrenceDeserializer(result.body);
}

/** A synchronous resource action. */
export async function triggerManualOccurrence(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsTriggerManualOccurrenceOptionalParams = {
    requestOptions: {},
  },
): Promise<Occurrence> {
  const result = await _triggerManualOccurrenceSend(
    context,
    resourceGroupName,
    scheduledActionName,
    options,
  );
  return _triggerManualOccurrenceDeserialize(result);
}

export function _cancelNextOccurrenceSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: CancelOccurrenceRequest,
  options: ScheduledActionsCancelNextOccurrenceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/cancelNextOccurrence{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: cancelOccurrenceRequestSerializer(body),
  });
}

export async function _cancelNextOccurrenceDeserialize(
  result: PathUncheckedResponse,
): Promise<RecurringActionsResourceOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recurringActionsResourceOperationResultDeserializer(result.body);
}

/** A synchronous resource action. */
export async function cancelNextOccurrence(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: CancelOccurrenceRequest,
  options: ScheduledActionsCancelNextOccurrenceOptionalParams = {
    requestOptions: {},
  },
): Promise<RecurringActionsResourceOperationResult> {
  const result = await _cancelNextOccurrenceSend(
    context,
    resourceGroupName,
    scheduledActionName,
    body,
    options,
  );
  return _cancelNextOccurrenceDeserialize(result);
}

export function _enableSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** A synchronous resource action. */
export async function enable(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsEnableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableSend(context, resourceGroupName, scheduledActionName, options);
  return _enableDeserialize(result);
}

export function _disableSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** A synchronous resource action. */
export async function disable(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDisableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableSend(context, resourceGroupName, scheduledActionName, options);
  return _disableDeserialize(result);
}

export function _patchResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourcePatchRequest,
  options: ScheduledActionsPatchResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/patchResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: resourcePatchRequestSerializer(body),
  });
}

export async function _patchResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<RecurringActionsResourceOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recurringActionsResourceOperationResultDeserializer(result.body);
}

/** A synchronous resource action. */
export async function patchResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourcePatchRequest,
  options: ScheduledActionsPatchResourcesOptionalParams = {
    requestOptions: {},
  },
): Promise<RecurringActionsResourceOperationResult> {
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
  options: ScheduledActionsDetachResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/detachResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: resourceDetachRequestSerializer(body),
  });
}

export async function _detachResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<RecurringActionsResourceOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recurringActionsResourceOperationResultDeserializer(result.body);
}

/** A synchronous resource action. */
export async function detachResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceDetachRequest,
  options: ScheduledActionsDetachResourcesOptionalParams = {
    requestOptions: {},
  },
): Promise<RecurringActionsResourceOperationResult> {
  const result = await _detachResourcesSend(
    context,
    resourceGroupName,
    scheduledActionName,
    body,
    options,
  );
  return _detachResourcesDeserialize(result);
}

export function _attachResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceAttachRequest,
  options: ScheduledActionsAttachResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/attachResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: resourceAttachRequestSerializer(body),
  });
}

export async function _attachResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<RecurringActionsResourceOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return recurringActionsResourceOperationResultDeserializer(result.body);
}

/** A synchronous resource action. */
export async function attachResources(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  body: ResourceAttachRequest,
  options: ScheduledActionsAttachResourcesOptionalParams = {
    requestOptions: {},
  },
): Promise<RecurringActionsResourceOperationResult> {
  const result = await _attachResourcesSend(
    context,
    resourceGroupName,
    scheduledActionName,
    body,
    options,
  );
  return _attachResourcesDeserialize(result);
}

export function _listResourcesSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsListResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: ScheduledActionsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/scheduledActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScheduledActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _scheduledActionListResultDeserializer(result.body);
}

/** List ScheduledAction resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: ScheduledActionsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ScheduledAction> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ScheduledActionsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScheduledActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _scheduledActionListResultDeserializer(result.body);
}

/** List ScheduledAction resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ScheduledActionsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ScheduledAction> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a ScheduledAction */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: scheduledActionUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ScheduledAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return scheduledActionDeserializer(result.body);
}

/** Update a ScheduledAction */
export async function update(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  properties: ScheduledActionUpdate,
  options: ScheduledActionsUpdateOptionalParams = { requestOptions: {} },
): Promise<ScheduledAction> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    scheduledActionName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  resource: ScheduledAction,
  options: ScheduledActionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: scheduledActionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ScheduledAction> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
  options: ScheduledActionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ScheduledAction>, ScheduledAction> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, scheduledActionName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ScheduledAction>, ScheduledAction>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scheduledActionName: string,
  options: ScheduledActionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ComputeSchedule/scheduledActions/{scheduledActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scheduledActionName: scheduledActionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ScheduledAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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

export function _virtualMachinesGetOperationErrorsSend(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationErrors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getOperationErrorsRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesGetOperationErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationErrorsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getOperationErrorsResponseDeserializer(result.body);
}

/** VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. */
export async function virtualMachinesGetOperationErrors(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationErrorsRequest,
  options: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationErrorsResponse> {
  const result = await _virtualMachinesGetOperationErrorsSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesGetOperationErrorsDeserialize(result);
}

export function _virtualMachinesCancelOperationsSend(
  context: Client,
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesCancelOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: cancelOperationsRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesCancelOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<CancelOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return cancelOperationsResponseDeserializer(result.body);
}

/** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
export async function virtualMachinesCancelOperations(
  context: Client,
  locationparameter: string,
  requestBody: CancelOperationsRequest,
  options: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams = {
    requestOptions: {},
  },
): Promise<CancelOperationsResponse> {
  const result = await _virtualMachinesCancelOperationsSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesCancelOperationsDeserialize(result);
}

export function _virtualMachinesGetOperationStatusSend(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationStatusRequest,
  options: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesGetOperationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getOperationStatusRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesGetOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<GetOperationStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getOperationStatusResponseDeserializer(result.body);
}

/** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
export async function virtualMachinesGetOperationStatus(
  context: Client,
  locationparameter: string,
  requestBody: GetOperationStatusRequest,
  options: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<GetOperationStatusResponse> {
  const result = await _virtualMachinesGetOperationStatusSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesGetOperationStatusDeserialize(result);
}

export function _virtualMachinesExecuteDeleteSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteDeleteRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: executeDeleteRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deleteResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteDelete(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteDeleteRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<DeleteResourceOperationResponse> {
  const result = await _virtualMachinesExecuteDeleteSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteDeleteDeserialize(result);
}

export function _virtualMachinesExecuteCreateSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteCreateRequest,
  options: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteCreate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: executeCreateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return createResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteCreate(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteCreateRequest,
  options: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams = {
    requestOptions: {},
  },
): Promise<CreateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteCreateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteCreateDeserialize(result);
}

export function _virtualMachinesExecuteStartSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: executeStartRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return startResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteStart(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteStartRequest,
  options: ScheduledActionsVirtualMachinesExecuteStartOptionalParams = {
    requestOptions: {},
  },
): Promise<StartResourceOperationResponse> {
  const result = await _virtualMachinesExecuteStartSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteStartDeserialize(result);
}

export function _virtualMachinesExecuteHibernateSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteHibernateRequest,
  options: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: executeHibernateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return hibernateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteHibernate(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteHibernateRequest,
  options: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteHibernateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteHibernateDeserialize(result);
}

export function _virtualMachinesExecuteDeallocateSend(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteDeallocateRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesExecuteDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: executeDeallocateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesExecuteDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deallocateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
export async function virtualMachinesExecuteDeallocate(
  context: Client,
  locationparameter: string,
  requestBody: ExecuteDeallocateRequest,
  options: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _virtualMachinesExecuteDeallocateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesExecuteDeallocateDeserialize(result);
}

export function _virtualMachinesSubmitStartSend(
  context: Client,
  locationparameter: string,
  requestBody: SubmitStartRequest,
  options: ScheduledActionsVirtualMachinesSubmitStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitStart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: submitStartRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesSubmitStartDeserialize(
  result: PathUncheckedResponse,
): Promise<StartResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return startResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. */
export async function virtualMachinesSubmitStart(
  context: Client,
  locationparameter: string,
  requestBody: SubmitStartRequest,
  options: ScheduledActionsVirtualMachinesSubmitStartOptionalParams = {
    requestOptions: {},
  },
): Promise<StartResourceOperationResponse> {
  const result = await _virtualMachinesSubmitStartSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesSubmitStartDeserialize(result);
}

export function _virtualMachinesSubmitHibernateSend(
  context: Client,
  locationparameter: string,
  requestBody: SubmitHibernateRequest,
  options: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitHibernate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: submitHibernateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesSubmitHibernateDeserialize(
  result: PathUncheckedResponse,
): Promise<HibernateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return hibernateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. */
export async function virtualMachinesSubmitHibernate(
  context: Client,
  locationparameter: string,
  requestBody: SubmitHibernateRequest,
  options: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams = {
    requestOptions: {},
  },
): Promise<HibernateResourceOperationResponse> {
  const result = await _virtualMachinesSubmitHibernateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesSubmitHibernateDeserialize(result);
}

export function _virtualMachinesSubmitDeallocateSend(
  context: Client,
  locationparameter: string,
  requestBody: SubmitDeallocateRequest,
  options: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeSchedule/locations/{locationparameter}/virtualMachinesSubmitDeallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationparameter: locationparameter,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: submitDeallocateRequestSerializer(requestBody),
  });
}

export async function _virtualMachinesSubmitDeallocateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeallocateResourceOperationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deallocateResourceOperationResponseDeserializer(result.body);
}

/** VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. */
export async function virtualMachinesSubmitDeallocate(
  context: Client,
  locationparameter: string,
  requestBody: SubmitDeallocateRequest,
  options: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams = {
    requestOptions: {},
  },
): Promise<DeallocateResourceOperationResponse> {
  const result = await _virtualMachinesSubmitDeallocateSend(
    context,
    locationparameter,
    requestBody,
    options,
  );
  return _virtualMachinesSubmitDeallocateDeserialize(result);
}
