// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  EnclaveResource,
  VirtualEnclavePatchModel,
  _EnclaveResourceListResult,
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  enclaveResourceSerializer,
  enclaveResourceDeserializer,
  virtualEnclavePatchModelSerializer,
  _enclaveResourceListResultDeserializer,
  approvalCallbackRequestSerializer,
  approvalActionResponseDeserializer,
  approvalDeletionCallbackRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualEnclaveHandleApprovalDeletionOptionalParams,
  VirtualEnclaveHandleApprovalCreationOptionalParams,
  VirtualEnclaveListBySubscriptionOptionalParams,
  VirtualEnclaveListByResourceGroupOptionalParams,
  VirtualEnclaveDeleteOptionalParams,
  VirtualEnclaveUpdateOptionalParams,
  VirtualEnclaveCreateOrUpdateOptionalParams,
  VirtualEnclaveGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _handleApprovalDeletionSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  body: ApprovalDeletionCallbackRequest,
  options: VirtualEnclaveHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/handleApprovalDeletion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
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
    body: approvalDeletionCallbackRequestSerializer(body),
  });
}

export async function _handleApprovalDeletionDeserialize(
  result: PathUncheckedResponse,
): Promise<ApprovalActionResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return approvalActionResponseDeserializer(result.body);
}

/** Callback that triggers on approval deletion state change. */
export function handleApprovalDeletion(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  body: ApprovalDeletionCallbackRequest,
  options: VirtualEnclaveHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _handleApprovalDeletionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _handleApprovalDeletionSend(context, resourceGroupName, virtualEnclaveName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _handleApprovalCreationSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  body: ApprovalCallbackRequest,
  options: VirtualEnclaveHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/handleApprovalCreation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
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
    body: approvalCallbackRequestSerializer(body),
  });
}

export async function _handleApprovalCreationDeserialize(
  result: PathUncheckedResponse,
): Promise<ApprovalActionResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return approvalActionResponseDeserializer(result.body);
}

/** Callback that triggers on approval state change. */
export function handleApprovalCreation(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  body: ApprovalCallbackRequest,
  options: VirtualEnclaveHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _handleApprovalCreationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _handleApprovalCreationSend(context, resourceGroupName, virtualEnclaveName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: VirtualEnclaveListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/virtualEnclaves{?api%2Dversion}",
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
): Promise<_EnclaveResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enclaveResourceListResultDeserializer(result.body);
}

/** List EnclaveResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: VirtualEnclaveListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnclaveResource> {
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
  options: VirtualEnclaveListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves{?api%2Dversion}",
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
): Promise<_EnclaveResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enclaveResourceListResultDeserializer(result.body);
}

/** List EnclaveResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VirtualEnclaveListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnclaveResource> {
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
  virtualEnclaveName: string,
  options: VirtualEnclaveDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a EnclaveResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: VirtualEnclaveDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, virtualEnclaveName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  properties: VirtualEnclavePatchModel,
  options: VirtualEnclaveUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
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
    body: virtualEnclavePatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<EnclaveResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveResourceDeserializer(result.body);
}

/** Update a EnclaveResource */
export function update(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  properties: VirtualEnclavePatchModel,
  options: VirtualEnclaveUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EnclaveResource>, EnclaveResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, virtualEnclaveName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<EnclaveResource>, EnclaveResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  resource: EnclaveResource,
  options: VirtualEnclaveCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
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
    body: enclaveResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnclaveResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveResourceDeserializer(result.body);
}

/** Create a EnclaveResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  resource: EnclaveResource,
  options: VirtualEnclaveCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EnclaveResource>, EnclaveResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, virtualEnclaveName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<EnclaveResource>, EnclaveResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: VirtualEnclaveGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EnclaveResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveResourceDeserializer(result.body);
}

/** Get a EnclaveResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: VirtualEnclaveGetOptionalParams = { requestOptions: {} },
): Promise<EnclaveResource> {
  const result = await _getSend(context, resourceGroupName, virtualEnclaveName, options);
  return _getDeserialize(result);
}
