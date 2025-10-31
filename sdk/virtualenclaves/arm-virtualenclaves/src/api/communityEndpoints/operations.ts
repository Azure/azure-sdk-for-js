// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  ApprovalCallbackRequest,
  ApprovalActionResponse,
  ApprovalDeletionCallbackRequest,
  CommunityEndpointResource,
  CommunityEndpointPatchModel,
  _CommunityEndpointResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  approvalCallbackRequestSerializer,
  approvalActionResponseDeserializer,
  approvalDeletionCallbackRequestSerializer,
  communityEndpointResourceSerializer,
  communityEndpointResourceDeserializer,
  communityEndpointPatchModelSerializer,
  _communityEndpointResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CommunityEndpointsHandleApprovalDeletionOptionalParams,
  CommunityEndpointsHandleApprovalCreationOptionalParams,
  CommunityEndpointsListBySubscriptionOptionalParams,
  CommunityEndpointsListByCommunityResourceOptionalParams,
  CommunityEndpointsDeleteOptionalParams,
  CommunityEndpointsUpdateOptionalParams,
  CommunityEndpointsCreateOrUpdateOptionalParams,
  CommunityEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _handleApprovalDeletionSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  body: ApprovalDeletionCallbackRequest,
  options: CommunityEndpointsHandleApprovalDeletionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints/{communityEndpointName}/handleApprovalDeletion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      communityEndpointName: communityEndpointName,
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
  communityName: string,
  communityEndpointName: string,
  body: ApprovalDeletionCallbackRequest,
  options: CommunityEndpointsHandleApprovalDeletionOptionalParams = {
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
        communityName,
        communityEndpointName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _handleApprovalCreationSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  body: ApprovalCallbackRequest,
  options: CommunityEndpointsHandleApprovalCreationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints/{communityEndpointName}/handleApprovalCreation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      communityEndpointName: communityEndpointName,
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
  communityName: string,
  communityEndpointName: string,
  body: ApprovalCallbackRequest,
  options: CommunityEndpointsHandleApprovalCreationOptionalParams = {
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
        communityName,
        communityEndpointName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _listBySubscriptionSend(
  context: Client,
  communityName: string,
  options: CommunityEndpointsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      communityName: communityName,
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
): Promise<_CommunityEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _communityEndpointResourceListResultDeserializer(result.body);
}

/** List CommunityEndpointResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  communityName: string,
  options: CommunityEndpointsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CommunityEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, communityName, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByCommunityResourceSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: CommunityEndpointsListByCommunityResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
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

export async function _listByCommunityResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommunityEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _communityEndpointResourceListResultDeserializer(result.body);
}

/** List CommunityEndpointResource resources by CommunityResource */
export function listByCommunityResource(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: CommunityEndpointsListByCommunityResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CommunityEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCommunityResourceSend(context, resourceGroupName, communityName, options),
    _listByCommunityResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  options: CommunityEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints/{communityEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      communityEndpointName: communityEndpointName,
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

/** Delete a CommunityEndpointResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  options: CommunityEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, communityName, communityEndpointName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  properties: CommunityEndpointPatchModel,
  options: CommunityEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints/{communityEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      communityEndpointName: communityEndpointName,
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
    body: communityEndpointPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunityEndpointResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return communityEndpointResourceDeserializer(result.body);
}

/** Update a CommunityEndpointResource */
export function update(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  properties: CommunityEndpointPatchModel,
  options: CommunityEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommunityEndpointResource>, CommunityEndpointResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        communityName,
        communityEndpointName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CommunityEndpointResource>, CommunityEndpointResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  resource: CommunityEndpointResource,
  options: CommunityEndpointsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints/{communityEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      communityEndpointName: communityEndpointName,
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
    body: communityEndpointResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunityEndpointResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return communityEndpointResourceDeserializer(result.body);
}

/** Create a CommunityEndpointResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  resource: CommunityEndpointResource,
  options: CommunityEndpointsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CommunityEndpointResource>, CommunityEndpointResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        communityName,
        communityEndpointName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<CommunityEndpointResource>, CommunityEndpointResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  options: CommunityEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/communityEndpoints/{communityEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      communityEndpointName: communityEndpointName,
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
): Promise<CommunityEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return communityEndpointResourceDeserializer(result.body);
}

/** Get a CommunityEndpointResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  communityEndpointName: string,
  options: CommunityEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<CommunityEndpointResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    communityName,
    communityEndpointName,
    options,
  );
  return _getDeserialize(result);
}
