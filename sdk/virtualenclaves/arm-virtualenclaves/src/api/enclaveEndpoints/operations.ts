// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
  EnclaveEndpointResource,
  EnclaveEndpointPatchModel,
  _EnclaveEndpointResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  approvalCallbackRequestSerializer,
  approvalActionResponseDeserializer,
  approvalDeletionCallbackRequestSerializer,
  enclaveEndpointResourceSerializer,
  enclaveEndpointResourceDeserializer,
  enclaveEndpointPatchModelSerializer,
  _enclaveEndpointResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnclaveEndpointsHandleApprovalDeletionOptionalParams,
  EnclaveEndpointsHandleApprovalCreationOptionalParams,
  EnclaveEndpointsListBySubscriptionOptionalParams,
  EnclaveEndpointsListByEnclaveResourceOptionalParams,
  EnclaveEndpointsDeleteOptionalParams,
  EnclaveEndpointsUpdateOptionalParams,
  EnclaveEndpointsCreateOrUpdateOptionalParams,
  EnclaveEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _handleApprovalDeletionSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  body: ApprovalDeletionCallbackRequest,
  options: EnclaveEndpointsHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints/{enclaveEndpointName}/handleApprovalDeletion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      enclaveEndpointName: enclaveEndpointName,
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
  enclaveEndpointName: string,
  body: ApprovalDeletionCallbackRequest,
  options: EnclaveEndpointsHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _handleApprovalDeletionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _handleApprovalDeletionSend(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _handleApprovalCreationSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  body: ApprovalCallbackRequest,
  options: EnclaveEndpointsHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints/{enclaveEndpointName}/handleApprovalCreation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      enclaveEndpointName: enclaveEndpointName,
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
  enclaveEndpointName: string,
  body: ApprovalCallbackRequest,
  options: EnclaveEndpointsHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _handleApprovalCreationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _handleApprovalCreationSend(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _listBySubscriptionSend(
  context: Client,
  virtualEnclaveName: string,
  options: EnclaveEndpointsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnclaveEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enclaveEndpointResourceListResultDeserializer(result.body);
}

/** List EnclaveEndpointResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  virtualEnclaveName: string,
  options: EnclaveEndpointsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnclaveEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, virtualEnclaveName, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByEnclaveResourceSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: EnclaveEndpointsListByEnclaveResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints{?api%2Dversion}",
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

export async function _listByEnclaveResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnclaveEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enclaveEndpointResourceListResultDeserializer(result.body);
}

/** List EnclaveEndpointResource resources by EnclaveResource */
export function listByEnclaveResource(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  options: EnclaveEndpointsListByEnclaveResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnclaveEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnclaveResourceSend(context, resourceGroupName, virtualEnclaveName, options),
    _listByEnclaveResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  options: EnclaveEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints/{enclaveEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      enclaveEndpointName: enclaveEndpointName,
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

/** Delete a EnclaveEndpointResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  options: EnclaveEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualEnclaveName, enclaveEndpointName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  properties: EnclaveEndpointPatchModel,
  options: EnclaveEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints/{enclaveEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      enclaveEndpointName: enclaveEndpointName,
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
    body: enclaveEndpointPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnclaveEndpointResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveEndpointResourceDeserializer(result.body);
}

/** Update a EnclaveEndpointResource */
export function update(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  properties: EnclaveEndpointPatchModel,
  options: EnclaveEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EnclaveEndpointResource>, EnclaveEndpointResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<EnclaveEndpointResource>, EnclaveEndpointResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  resource: EnclaveEndpointResource,
  options: EnclaveEndpointsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints/{enclaveEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      enclaveEndpointName: enclaveEndpointName,
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
    body: enclaveEndpointResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnclaveEndpointResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveEndpointResourceDeserializer(result.body);
}

/** Create a EnclaveEndpointResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  resource: EnclaveEndpointResource,
  options: EnclaveEndpointsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<EnclaveEndpointResource>, EnclaveEndpointResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualEnclaveName,
        enclaveEndpointName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<EnclaveEndpointResource>, EnclaveEndpointResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  options: EnclaveEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/virtualEnclaves/{virtualEnclaveName}/enclaveEndpoints/{enclaveEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualEnclaveName: virtualEnclaveName,
      enclaveEndpointName: enclaveEndpointName,
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
): Promise<EnclaveEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enclaveEndpointResourceDeserializer(result.body);
}

/** Get a EnclaveEndpointResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualEnclaveName: string,
  enclaveEndpointName: string,
  options: EnclaveEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<EnclaveEndpointResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualEnclaveName,
    enclaveEndpointName,
    options,
  );
  return _getDeserialize(result);
}
