// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  ApprovalActionResponse,
  ApprovalResource,
  _ApprovalResourceListResult,
  ApprovalPatchModel,
  ApprovalActionRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  approvalActionResponseDeserializer,
  approvalResourceSerializer,
  approvalResourceDeserializer,
  _approvalResourceListResultDeserializer,
  approvalPatchModelSerializer,
  approvalActionRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApprovalNotifyInitiatorOptionalParams,
  ApprovalDeleteOptionalParams,
  ApprovalUpdateOptionalParams,
  ApprovalListByParentOptionalParams,
  ApprovalCreateOrUpdateOptionalParams,
  ApprovalGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _notifyInitiatorSend(
  context: Client,
  resourceUri: string,
  approvalName: string,
  body: ApprovalActionRequest,
  options: ApprovalNotifyInitiatorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Mission/approvals/{approvalName}/notifyInitiator{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      approvalName: approvalName,
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
    body: approvalActionRequestSerializer(body),
  });
}

export async function _notifyInitiatorDeserialize(
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

/** Upon receiving approval or rejection from approver, this facilitates actions on approval resource */
export function notifyInitiator(
  context: Client,
  resourceUri: string,
  approvalName: string,
  body: ApprovalActionRequest,
  options: ApprovalNotifyInitiatorOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse> {
  return getLongRunningPoller(context, _notifyInitiatorDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _notifyInitiatorSend(context, resourceUri, approvalName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalActionResponse>, ApprovalActionResponse>;
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  approvalName: string,
  options: ApprovalDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Mission/approvals/{approvalName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      approvalName: approvalName,
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

/** Delete a ApprovalResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  approvalName: string,
  options: ApprovalDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, approvalName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  approvalName: string,
  properties: ApprovalPatchModel,
  options: ApprovalUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Mission/approvals/{approvalName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      approvalName: approvalName,
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
    body: approvalPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ApprovalResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return approvalResourceDeserializer(result.body);
}

/** Update a ApprovalResource */
export function update(
  context: Client,
  resourceUri: string,
  approvalName: string,
  properties: ApprovalPatchModel,
  options: ApprovalUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApprovalResource>, ApprovalResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceUri, approvalName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ApprovalResource>, ApprovalResource>;
}

export function _listByParentSend(
  context: Client,
  resourceUri: string,
  options: ApprovalListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Mission/approvals{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApprovalResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _approvalResourceListResultDeserializer(result.body);
}

/** List ApprovalResource resources by parent */
export function listByParent(
  context: Client,
  resourceUri: string,
  options: ApprovalListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApprovalResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceUri, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  approvalName: string,
  resource: ApprovalResource,
  options: ApprovalCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Mission/approvals/{approvalName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      approvalName: approvalName,
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
    body: approvalResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApprovalResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return approvalResourceDeserializer(result.body);
}

/** Create a ApprovalResource */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  approvalName: string,
  resource: ApprovalResource,
  options: ApprovalCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApprovalResource>, ApprovalResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, approvalName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ApprovalResource>, ApprovalResource>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  approvalName: string,
  options: ApprovalGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Mission/approvals/{approvalName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      approvalName: approvalName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApprovalResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return approvalResourceDeserializer(result.body);
}

/** Get a ApprovalResource */
export async function get(
  context: Client,
  resourceUri: string,
  approvalName: string,
  options: ApprovalGetOptionalParams = { requestOptions: {} },
): Promise<ApprovalResource> {
  const result = await _getSend(context, resourceUri, approvalName, options);
  return _getDeserialize(result);
}
