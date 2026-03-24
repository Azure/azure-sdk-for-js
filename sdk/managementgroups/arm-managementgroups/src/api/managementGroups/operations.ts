// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext as Client } from "../index.js";
import type {
  ManagementGroup,
  CreateManagementGroupRequest,
  PatchManagementGroupRequest,
  _DescendantListResult,
  DescendantInfo,
  _ManagementGroupListResult,
  ManagementGroupInfo,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managementGroupDeserializer,
  createManagementGroupRequestSerializer,
  patchManagementGroupRequestSerializer,
  _descendantListResultDeserializer,
  _managementGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagementGroupsListOptionalParams,
  ManagementGroupsGetDescendantsOptionalParams,
  ManagementGroupsDeleteOptionalParams,
  ManagementGroupsUpdateOptionalParams,
  ManagementGroupsCreateOrUpdateOptionalParams,
  ManagementGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: ManagementGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups{?api%2Dversion,%24skiptoken}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      "%24skiptoken": options?.skiptoken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagementGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managementGroupListResultDeserializer(result.body);
}

/** List management groups for the authenticated user. */
export function list(
  context: Client,
  options: ManagementGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagementGroupInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "NextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _getDescendantsSend(
  context: Client,
  groupId: string,
  options: ManagementGroupsGetDescendantsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/descendants{?api%2Dversion,%24skiptoken,%24top}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      "%24skiptoken": options?.skiptoken,
      "%24top": options?.top,
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

export async function _getDescendantsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DescendantListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _descendantListResultDeserializer(result.body);
}

/** List all entities that descend from a management group. */
export function getDescendants(
  context: Client,
  groupId: string,
  options: ManagementGroupsGetDescendantsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DescendantInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _getDescendantsSend(context, groupId, options),
    _getDescendantsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  groupId: string,
  options: ManagementGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
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

/**
 * Delete management group.
 * If a management group contains child resources, the request will fail.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  groupId: string,
  options: ManagementGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, groupId, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  groupId: string,
  patchGroupRequest: PatchManagementGroupRequest,
  options: ManagementGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: patchManagementGroupRequestSerializer(patchGroupRequest),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagementGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managementGroupDeserializer(result.body);
}

/** Update a management group. */
export async function update(
  context: Client,
  groupId: string,
  patchGroupRequest: PatchManagementGroupRequest,
  options: ManagementGroupsUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagementGroup> {
  const result = await _updateSend(context, groupId, patchGroupRequest, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  groupId: string,
  createManagementGroupRequest: CreateManagementGroupRequest,
  options: ManagementGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}{?api%2Dversion}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createManagementGroupRequestSerializer(createManagementGroupRequest),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagementGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managementGroupDeserializer(result.body);
}

/**
 * Create or update a management group.
 * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
 */
export function createOrUpdate(
  context: Client,
  groupId: string,
  createManagementGroupRequest: CreateManagementGroupRequest,
  options: ManagementGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagementGroup>, ManagementGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, groupId, createManagementGroupRequest, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<ManagementGroup>, ManagementGroup>;
}

export function _getSend(
  context: Client,
  groupId: string,
  options: ManagementGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}{?api%2Dversion,%24expand,%24recurse,%24filter}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      "%24expand": options?.expand,
      "%24recurse": options?.recurse,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagementGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managementGroupDeserializer(result.body);
}

/** Get the details of the management group. */
export async function get(
  context: Client,
  groupId: string,
  options: ManagementGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ManagementGroup> {
  const result = await _getSend(context, groupId, options);
  return _getDeserialize(result);
}
