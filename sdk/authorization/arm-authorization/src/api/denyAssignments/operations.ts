// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { DenyAssignment } from "../../models/microsoft/denyAssignment/models.js";
import {
  denyAssignmentSerializer,
  denyAssignmentDeserializer,
} from "../../models/microsoft/denyAssignment/models.js";
import type { _DenyAssignmentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _denyAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DenyAssignmentsGetByIdOptionalParams,
  DenyAssignmentsListForResourceGroupOptionalParams,
  DenyAssignmentsListOptionalParams,
  DenyAssignmentsListForScopeOptionalParams,
  DenyAssignmentsListForResourceOptionalParams,
  DenyAssignmentsDeleteOptionalParams,
  DenyAssignmentsCreateOrUpdateOptionalParams,
  DenyAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getByIdSend(
  context: Client,
  denyAssignmentId: string,
  options: DenyAssignmentsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+denyAssignmentId}{?api%2Dversion}",
    {
      denyAssignmentId: denyAssignmentId,
      "api%2Dversion": "2024-07-01-preview",
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

export async function _getByIdDeserialize(result: PathUncheckedResponse): Promise<DenyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return denyAssignmentDeserializer(result.body);
}

/** Gets a deny assignment by ID. */
export async function getById(
  context: Client,
  denyAssignmentId: string,
  options: DenyAssignmentsGetByIdOptionalParams = { requestOptions: {} },
): Promise<DenyAssignment> {
  const result = await _getByIdSend(context, denyAssignmentId, options);
  return _getByIdDeserialize(result);
}

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DenyAssignmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/denyAssignments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-07-01-preview",
      "%24filter": options?.filter,
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

export async function _listForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DenyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _denyAssignmentListResultDeserializer(result.body);
}

/** Gets deny assignments for a resource group. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DenyAssignmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DenyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-07-01-preview" },
  );
}

export function _listSend(
  context: Client,
  options: DenyAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/denyAssignments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-07-01-preview",
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DenyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _denyAssignmentListResultDeserializer(result.body);
}

/** Gets all deny assignments for the subscription. */
export function list(
  context: Client,
  options: DenyAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DenyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-07-01-preview" },
  );
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: DenyAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/denyAssignments{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": "2024-07-01-preview",
      "%24filter": options?.filter,
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DenyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _denyAssignmentListResultDeserializer(result.body);
}

/** Gets deny assignments for a scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: DenyAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DenyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-07-01-preview" },
  );
}

export function _listForResourceSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: DenyAssignmentsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{+resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}/providers/Microsoft.Authorization/denyAssignments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": "2024-07-01-preview",
      "%24filter": options?.filter,
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

export async function _listForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_DenyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _denyAssignmentListResultDeserializer(result.body);
}

/** Gets deny assignments for a resource. */
export function listForResource(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: DenyAssignmentsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DenyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listForResourceSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options,
      ),
    _listForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-07-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  denyAssignmentId: string,
  options: DenyAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/denyAssignments/{denyAssignmentId}{?api%2Dversion}",
    {
      scope: scope,
      denyAssignmentId: denyAssignmentId,
      "api%2Dversion": "2024-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a deny assignment by scope and name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  denyAssignmentId: string,
  options: DenyAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, denyAssignmentId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  denyAssignmentId: string,
  parameters: DenyAssignment,
  options: DenyAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/denyAssignments/{denyAssignmentId}{?api%2Dversion}",
    {
      scope: scope,
      denyAssignmentId: denyAssignmentId,
      "api%2Dversion": "2024-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: denyAssignmentSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DenyAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return denyAssignmentDeserializer(result.body);
}

/** Create or update a deny assignment by scope and name. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  denyAssignmentId: string,
  parameters: DenyAssignment,
  options: DenyAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DenyAssignment> {
  const result = await _createOrUpdateSend(context, scope, denyAssignmentId, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  denyAssignmentId: string,
  options: DenyAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/denyAssignments/{denyAssignmentId}{?api%2Dversion}",
    {
      scope: scope,
      denyAssignmentId: denyAssignmentId,
      "api%2Dversion": "2024-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DenyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return denyAssignmentDeserializer(result.body);
}

/** Get the specified deny assignment. */
export async function get(
  context: Client,
  scope: string,
  denyAssignmentId: string,
  options: DenyAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<DenyAssignment> {
  const result = await _getSend(context, scope, denyAssignmentId, options);
  return _getDeserialize(result);
}
