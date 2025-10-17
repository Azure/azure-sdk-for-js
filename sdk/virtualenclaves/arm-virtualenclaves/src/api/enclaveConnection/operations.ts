// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
  EnclaveConnectionResource,
  EnclaveConnectionPatchModel,
  _EnclaveConnectionResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  approvalCallbackRequestSerializer,
  approvalActionResponseDeserializer,
  approvalDeletionCallbackRequestSerializer,
  enclaveConnectionResourceSerializer,
  enclaveConnectionResourceDeserializer,
  enclaveConnectionPatchModelSerializer,
  _enclaveConnectionResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnclaveConnectionHandleApprovalDeletionOptionalParams,
  EnclaveConnectionHandleApprovalCreationOptionalParams,
  EnclaveConnectionListBySubscriptionOptionalParams,
  EnclaveConnectionListByResourceGroupOptionalParams,
  EnclaveConnectionDeleteOptionalParams,
  EnclaveConnectionUpdateOptionalParams,
  EnclaveConnectionCreateOrUpdateOptionalParams,
  EnclaveConnectionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _handleApprovalDeletionSend(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  body: ApprovalDeletionCallbackRequest,
  options: EnclaveConnectionHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections/{enclaveConnectionName}/handleApprovalDeletion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enclaveConnectionName: enclaveConnectionName,
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
  enclaveConnectionName: string,
  body: ApprovalDeletionCallbackRequest,
  options: EnclaveConnectionHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _handleApprovalDeletionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _handleApprovalDeletionSend(context, resourceGroupName, enclaveConnectionName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _handleApprovalCreationSend(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  body: ApprovalCallbackRequest,
  options: EnclaveConnectionHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections/{enclaveConnectionName}/handleApprovalCreation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enclaveConnectionName: enclaveConnectionName,
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
  enclaveConnectionName: string,
  body: ApprovalCallbackRequest,
  options: EnclaveConnectionHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _handleApprovalCreationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _handleApprovalCreationSend(context, resourceGroupName, enclaveConnectionName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: EnclaveConnectionListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/enclaveConnections{?api%2Dversion}",
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
): Promise<_EnclaveConnectionResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enclaveConnectionResourceListResultDeserializer(result.body);
}

/** List EnclaveConnectionResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: EnclaveConnectionListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnclaveConnectionResource> {
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
  options: EnclaveConnectionListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections{?api%2Dversion}",
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
): Promise<_EnclaveConnectionResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enclaveConnectionResourceListResultDeserializer(result.body);
}

/** List EnclaveConnectionResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: EnclaveConnectionListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnclaveConnectionResource> {
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
  enclaveConnectionName: string,
  options: EnclaveConnectionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections/{enclaveConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enclaveConnectionName: enclaveConnectionName,
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

/** Delete a EnclaveConnectionResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  options: EnclaveConnectionDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, enclaveConnectionName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  properties: EnclaveConnectionPatchModel,
  options: EnclaveConnectionUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections/{enclaveConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enclaveConnectionName: enclaveConnectionName,
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
    body: enclaveConnectionPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnclaveConnectionResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveConnectionResourceDeserializer(result.body);
}

/** Update a EnclaveConnectionResource */
export function update(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  properties: EnclaveConnectionPatchModel,
  options: EnclaveConnectionUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EnclaveConnectionResource>, EnclaveConnectionResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, enclaveConnectionName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<EnclaveConnectionResource>, EnclaveConnectionResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  resource: EnclaveConnectionResource,
  options: EnclaveConnectionCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections/{enclaveConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enclaveConnectionName: enclaveConnectionName,
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
    body: enclaveConnectionResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnclaveConnectionResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveConnectionResourceDeserializer(result.body);
}

/** Create a EnclaveConnectionResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  resource: EnclaveConnectionResource,
  options: EnclaveConnectionCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<EnclaveConnectionResource>, EnclaveConnectionResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, enclaveConnectionName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<EnclaveConnectionResource>, EnclaveConnectionResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  options: EnclaveConnectionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/enclaveConnections/{enclaveConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enclaveConnectionName: enclaveConnectionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<EnclaveConnectionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveConnectionResourceDeserializer(result.body);
}

/** Get a EnclaveConnectionResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  enclaveConnectionName: string,
  options: EnclaveConnectionGetOptionalParams = { requestOptions: {} },
): Promise<EnclaveConnectionResource> {
  const result = await _getSend(context, resourceGroupName, enclaveConnectionName, options);
  return _getDeserialize(result);
}
