// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  RoleAssignment,
  RoleAssignmentCreateParameters,
  _RoleAssignmentListResult,
} from "../../models/microsoft/roleAssignment/models.js";
import {
  roleAssignmentDeserializer,
  roleAssignmentCreateParametersSerializer,
  _roleAssignmentListResultDeserializer,
} from "../../models/microsoft/roleAssignment/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleAssignmentsDeleteByIdOptionalParams,
  RoleAssignmentsCreateByIdOptionalParams,
  RoleAssignmentsGetByIdOptionalParams,
  RoleAssignmentsListForResourceOptionalParams,
  RoleAssignmentsListForResourceGroupOptionalParams,
  RoleAssignmentsListForSubscriptionOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteByIdSend(
  context: Client,
  roleAssignmentId: string,
  options: RoleAssignmentsDeleteByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+roleAssignmentId}{?api%2Dversion,tenantId}",
    {
      roleAssignmentId: roleAssignmentId,
      "api%2Dversion": "2022-04-01",
      tenantId: options?.tenantId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _deleteByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignment> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleAssignmentDeserializer(result.body);
}

/** Delete a role assignment by ID. */
export async function deleteById(
  context: Client,
  roleAssignmentId: string,
  options: RoleAssignmentsDeleteByIdOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _deleteByIdSend(context, roleAssignmentId, options);
  return _deleteByIdDeserialize(result);
}

export function _createByIdSend(
  context: Client,
  roleAssignmentId: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+roleAssignmentId}{?api%2Dversion}",
    {
      roleAssignmentId: roleAssignmentId,
      "api%2Dversion": "2022-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: roleAssignmentCreateParametersSerializer(parameters),
  });
}

export async function _createByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleAssignmentDeserializer(result.body);
}

/** Create or update a role assignment by ID. */
export async function createById(
  context: Client,
  roleAssignmentId: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateByIdOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _createByIdSend(context, roleAssignmentId, parameters, options);
  return _createByIdDeserialize(result);
}

export function _getByIdSend(
  context: Client,
  roleAssignmentId: string,
  options: RoleAssignmentsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+roleAssignmentId}{?api%2Dversion,tenantId}",
    {
      roleAssignmentId: roleAssignmentId,
      "api%2Dversion": "2022-04-01",
      tenantId: options?.tenantId,
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

export async function _getByIdDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleAssignmentDeserializer(result.body);
}

/** Get a role assignment by ID. */
export async function getById(
  context: Client,
  roleAssignmentId: string,
  options: RoleAssignmentsGetByIdOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _getByIdSend(context, roleAssignmentId, options);
  return _getByIdDeserialize(result);
}

export function _listForResourceSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  resourceType: string,
  resourceName: string,
  options: RoleAssignmentsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{+resourceProviderNamespace}/{+resourceType}/{+resourceName}/providers/Microsoft.Authorization/roleAssignments{?api%2Dversion,%24filter,tenantId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": "2022-04-01",
      "%24filter": options?.filter,
      tenantId: options?.tenantId,
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
): Promise<_RoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentListResultDeserializer(result.body);
}

/** List all role assignments that apply to a resource. */
export function listForResource(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  resourceType: string,
  resourceName: string,
  options: RoleAssignmentsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listForResourceSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        resourceType,
        resourceName,
        options,
      ),
    _listForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-04-01" },
  );
}

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: RoleAssignmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/roleAssignments{?api%2Dversion,%24filter,tenantId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2022-04-01",
      "%24filter": options?.filter,
      tenantId: options?.tenantId,
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
): Promise<_RoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentListResultDeserializer(result.body);
}

/** List all role assignments that apply to a resource group. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: RoleAssignmentsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-04-01" },
  );
}

export function _listForSubscriptionSend(
  context: Client,
  options: RoleAssignmentsListForSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/roleAssignments{?api%2Dversion,%24filter,tenantId}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2022-04-01",
      "%24filter": options?.filter,
      tenantId: options?.tenantId,
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

export async function _listForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_RoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentListResultDeserializer(result.body);
}

/** List all role assignments that apply to a subscription. */
export function listForSubscription(
  context: Client,
  options: RoleAssignmentsListForSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForSubscriptionSend(context, options),
    _listForSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-04-01" },
  );
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments{?api%2Dversion,%24filter,tenantId,%24skipToken}",
    {
      scope: scope,
      "api%2Dversion": "2022-04-01",
      "%24filter": options?.filter,
      tenantId: options?.tenantId,
      "%24skipToken": options?.skipToken,
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
): Promise<_RoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentListResultDeserializer(result.body);
}

/** List all role assignments that apply to a scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments/{+roleAssignmentName}{?api%2Dversion,tenantId}",
    {
      scope: scope,
      roleAssignmentName: roleAssignmentName,
      "api%2Dversion": "2022-04-01",
      tenantId: options?.tenantId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleAssignmentDeserializer(result.body);
}

/** Delete a role assignment by scope and name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _$deleteSend(context, scope, roleAssignmentName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments/{+roleAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentName: roleAssignmentName,
      "api%2Dversion": "2022-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: roleAssignmentCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleAssignmentDeserializer(result.body);
}

/** Create or update a role assignment by scope and name. */
export async function create(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _createSend(context, scope, roleAssignmentName, parameters, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments/{+roleAssignmentName}{?api%2Dversion,tenantId}",
    {
      scope: scope,
      roleAssignmentName: roleAssignmentName,
      "api%2Dversion": "2022-04-01",
      tenantId: options?.tenantId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleAssignmentDeserializer(result.body);
}

/** Get a role assignment by scope and name. */
export async function get(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _getSend(context, scope, roleAssignmentName, options);
  return _getDeserialize(result);
}
